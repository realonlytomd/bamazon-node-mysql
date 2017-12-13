
// set up to reference npm packages mysql and inquirer

var mysql = require("mysql");
var inquirer = require("inquirer");

// make connection to mysql

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
  showItems();
});
// first show the user the items up for sale.
// include the ids, names, and prices of products
var showItems = function() {
	connection.query("SELECT * FROM products", function(err,res) {
		if (err) throw err;
		console.log("Here are the items available for purchase:\n");
		//console.log(res);

// to print out in a properly lined up table, set up an array that is the
// number of letters in the product name
		var lengthOfName = [];

// then change the number of tabs after each product name, based on
// the length of each product name, so that the prices line up correctly
		
		for (var i = 0; i < res.length; i++) {

			lengthOfName[i] = res[i].product_name.split("").length;

			if (lengthOfName[i] > 28) {

				console.log("\t" + res[i].item_id + "\t" + res[i].product_name + 
				"\t$" + res[i].price);

			} else if (lengthOfName[i] > 21) {

				console.log("\t" + res[i].item_id + "\t" + res[i].product_name + 
				"\t\t$" + res[i].price);

			} else if (lengthOfName[i] > 14) {

				console.log("\t" + res[i].item_id + "\t" + res[i].product_name + 
				"\t\t\t$" + res[i].price);

			} else if (lengthOfName[i] > 7) {

				console.log("\t" + res[i].item_id + "\t" + res[i].product_name + 
				"\t\t\t\t$" + res[i].price);

			} else if (lengthOfName[i] > 0) {

				console.log("\t" + res[i].item_id + "\t" + res[i].product_name + 
				"\t\t\t\t\t$" + res[i].price);
			}
		}

// prompt to ask the user to enter the id of the item they'd like to buy

		inquirer.prompt({
			name: "choice",
			type: "rawlist",
			choices: function(value) {
				var choiceArr = [];
				for (var i = 0; i < res.length; i++) {
					choiceArr.push(res[i].product_name);
				}
				return choiceArr;
			},
			message:"Please select the ID number of the item you'd like to buy."
		}).then(function(answer) {
			for (var i = 0; i < res.length; i++) {
				if (res[i].product_name === answer.choice) {
					var itemTobuy = res[i];

// then ask how many units of that item

					inquirer.prompt({
						name:"quantity",
						type:"input",
						message:"How many " + itemTobuy.product_name + "s would you like?",
						validate:function(value) {
							if(isNaN(value) === false) {
								return true;
							} else {
								return false;
							}
						}

// check to make sure there are enough of the item
// subtract the number of requested items from the database

					}).then (function(answer) {
						//console.log(itemTobuy.stock_quantity);
						//console.log(parseInt(answer.quantity));
						//console.log("ID = " + itemTobuy.item_id);
						var newQuantity = itemTobuy.stock_quantity -
							parseInt(answer.quantity);
						//console.log("The new quantity of the item " + 
							// itemTobuy.product_name + " is " + newQuantity);
						if (itemTobuy.stock_quantity >= parseInt(answer.quantity)) {
							connection.query("UPDATE products SET ? WHERE ?",[{
								stock_quantity: newQuantity
							},{
								item_id: itemTobuy.item_id
							}], function(err,res) {
								console.log("Items available!");

// multiply the number of units they want (answer.quantity) by the
// cost of the individual unit (itemToBuy.price)

								var amtToPay = answer.quantity * itemTobuy.price;
								console.log("Please pay $" + amtToPay + ".");
								endShopping();
							});
						} else {
							console.log("Not enough " + itemTobuy.product_name +
								"s available. Please start over.");
							endShopping();
						}
					})
				}
			}
		})
	})
}
// include a function to end the shopping experience if so wished
function endShopping() {
	inquirer.prompt([
		{
		name: "letter",
		type: "input",
		message: "Do you want to continue shopping? (y or n)"
		}
	]).then(function(response) {
 
		var confirmPlay = response.letter;
		if (confirmPlay === "n") {
			console.log("Thanks for getting all of your Hogwarts needs at Bamazon!");
			process.exit(0);
		}
		else if (confirmPlay === "y") {
			showItems();
		}
		
	});
	
}

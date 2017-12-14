# bamazon-node-mysql

This is node based app utilizing mySQL to store a list of products one might need
for a school year at Hogwarts.

The user should type "node bamazonCustomer.js" at the terminal prompt.
![to launch app](/images/beginning.png)

The list of available items and prices appears.
![after hitting return](/images/show_first_prompt.png)

This screen shows mySQL where the database bamazon_db is stored, and
the table named products.
![products before purchase](images/before-purchase.png)

After selecting wands to buy, the second prompt appears, and type in 10.
![after selecting an item](/images/select-wand.png)

After entering the quantity the user wishes to purchase, the app
displays if there are enough available, and what the total price is.
Then the user is prompted if they wish to continue.
Or if there isn't enough available, then the user is also prompted if they wish
to continue.
![Continue?](/images/after-10wand-buy.png)

This second shot of the mySQL database and products table shows that 10 wands 
have been removed.
![products after purchase - 10 wands gone](images/after-wand-purchase.png)

If the user selects "y" to continue, then the list of products appears again
minus the the quantity of the item the user just purchased.
![after selecting y](/images/select-y-to-t pcontinue.png)

If the user selects "n" to stop, then they are thanked for shopping and the app stops.
![after selecting n]"(/images/select_n_to_stop.png)

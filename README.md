# bamazon-node-mysql

This is node based app utilizing mySQL to store a list of products one might need
for a school year at Hogwarts.

The user should type "node bamazonCustomer.js" at the terminal prompt.
![to launch app]
(/images/beginning.png)

The list of available items and prices appears.
![after hitting return]
(/images/show_first_prompt.png)

After selecting what item to buy, the second prompt appears, how many to purchase?
![after selecting an item]
(/images/show_second_prompt.png)

After entering the quantity the user wishes to purchase, the app
displays if there are enough available, and what the total price is.
Then the user is prompted if they wish to continue.
Or if there isn't enough available, then the user is also prompted if they wish
to continue.
![Continue?]
(/images/after_2nd_prompt_selection.png)

If the user selects "y" to continue, then the list of products appears again
minus the the quatity of the item the user just purchased.
![after selecting y]
(/images/select_y_to_continue.png)

If user selects "n" to stop, then they are thanked for shopping and the app stops.
![after selecting n]
(/images/select_n_to_stop.png)

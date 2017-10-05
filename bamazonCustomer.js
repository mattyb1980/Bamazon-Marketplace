var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
var colors = require("colors");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
});

// function which prompts the user for what action they should take

function showInventory() {
  // query the database for all items up for sale
  connection.query("SELECT * FROM products", function(err, inventory) {
    
    if (err) throw err;
    // Show a terminal table
      var invArray = [];
      for (var i = 0; i < inventory.length; i++) {
       
        console.log("Item ID: " + inventory[i].item_id + " \n\r | Product: " + inventory[i].product_name + "\n\r | Department: " + inventory[i].department_name + " \n\r | Price: " +  inventory[i].price);
      }

    // var t = new Table
 
    // invArray.forEach(function(inv,) {
    //   t.cell("Product Id", inventory[i].item_id)
    //   t.cell("Description", inventory[i].product_name)
    //   t.cell("Description", inventory[i].department_name)
    //   t.cell("Price, USD", inventory[i].price, Table.number(2))
    //   t.newRow()
    // })
    // console.log(t.toString())
      inquirer.prompt([

            // Here we create a basic text prompt.
            {
              type: "input",
              message: "What is the id of the item you would like to buy?",
              name: "id"
            },

               {
              type: "input",
              message: "How many would you like to purchase?",
              name: "quantity"
            }
        ]).then(function(order){
            var quantity = order.quantity;
            var itemId = order.id;
            connection.query("SELECT * FROM products WHERE item_id=" + itemId, function(err, selectedItem) {
                        if (err) throw err;
                           if (selectedItem[0].StockQuantity - quantity >= 0) {
                            console.log("Bamazon's Inventory has enough of that item (".green + selectedItem[0].ProductName.green + ")!".green);
                              console.log("Quantity in Stock: ".green + selectedItem[0].StockQuantity + " Order Quantity: ".green + quantity);
                              console.log("You will be charged ".green + (order.quantity * selectedItem[0].Price) +  " dollars.  Thank you for shopping at Bamazon.".green);
                              //  This is the code to remove the item from inventory.
         
                              connection.query('UPDATE products SET StockQuantity=? WHERE id=?', [selectedItem[0].StockQuantity - quantity, itemId],
                              function(err, inventory) {
                                if (err) throw err;
                                   // Runs the prompt again, so the user can keep shopping.
                                   showInventory();
                              });  // Ends the code to remove item from inventory.

                         }

                         else {
                              console.log("Insufficient quantity.  Please order less of that item, as Bamazon only has ".red + selectedItem[0].stock_qty + " " + selectedItem[0].product_name + "'s" + " in stock at this moment.".red);
                              showInventory();
                         }
                    });
      });

  });
}
showInventory();

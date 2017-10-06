var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");
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
  connection.query("SELECT item_id,product_name,price FROM products", function(err, inventory) {
    
    if (err) throw err;
    // Show a terminal table brought in by clolumnify
      console.log("Bamazon Products".blue);
      console.log("--------------------------------------------------------------------------".blue);

      console.log("><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><".blue);
      console.log("--------------------------------------------------------------------------".blue);
      var columns = columnify(inventory,{minWidth: 15,config: {price: {align: "right"}}})
      console.log(columns)
      // for (var i = 0; i < inventory.length; i++) {

      //   console.log("Item ID: " + inventory[i].item_id + " \n\r | Product: " + inventory[i].product_name + "\n\r | Department: " + inventory[i].department_name + " \n\r | Price: " +  inventory[i].price);

      inquirer.prompt([

            // Here we create a basic text prompt for the user.
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
                        console.log(selectedItem[0].stock_qty+" compared to "+quantity);
                           if ((selectedItem[0].stock_qty - quantity) >= 0) {
                            console.log("Bamazon's Inventory has enough of that item (".green + selectedItem[0].product_name.green + ")!".green);
                              console.log("Quantity in Stock: ".green + selectedItem[0].stock_qty + " Order Quantity: ".green + quantity);
                              console.log("You will be charged ".green + (order.quantity * selectedItem[0].price) +  " dollars.".green + "\n\rThank you for shopping at Bamazon.".green + "\n\rBamazon Marketplace will reload shortly...".green);
                             
                              //  This is the code to remove the item from inventory.
                              connection.query('UPDATE products SET stock_qty=? WHERE item_id=?', [(selectedItem[0].stock_qty - quantity), itemId],
                              function(err, inventory) {
                                if (err) throw err;

                              // Runs the prompt again, so the user can keep shopping. Setting a timeout to give the user time to read.
                              setTimeout(showInventory, 6000);
                              setTimeout(consoleClear, 6000);
                              });  // Ends the code to remove item from inventory.

                         }
                        // If amount ordered is greater than the amnount in the inventory.
                         else {
                              console.log("*Insufficient Inventory.*\n\rBamazon cannot fulfill your order at the moment.\n\rOur warehouse indicates that there are only |".red + selectedItem[0].stock_qty + " " + selectedItem[0].product_name.blue + "'s".blue + "| in stock at this moment.".red);
                              setTimeout(showInventory, 6000);
                              setTimeout(consoleClear, 6000);
                         }
                    });
      });

  });
  
}
// function to clear the terminal to give a cleaner look
consoleClear = function(){
  console.log('\033c');
};
consoleClear();
// console.reset = function (){
//   return process.stdout.write('\033c');
// }
showInventory();


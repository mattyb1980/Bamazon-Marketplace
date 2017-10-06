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
consoleClear = function(){
  console.log('\033c');
};

start();

function start() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?".red,
      choices: ["View Products", "Check For Low Inventory", "Restock Inventory", "Add A Product", "Quit Console"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.choices === "View Products") {
        showInventory();
      }
      else if (answer.choices === "Check For Low Inventory") {
        showLowInventory();
      }
      else if (answer.choices === "Restock Inventory") {
        restockInventory();
      }
      else if (answer.choices === "Add A Product") {
        addProduct();
      }
      else if (answer.choices === "Quit Console") {
        quitConsole();
      }
    });
}

// function which prompts the user for what action they should take

function showInventory() {
  consoleClear();
  // query the database for all items up for sale
  connection.query("SELECT item_id,product_name,price,stock_qty FROM products", function(err, inventory) {
    
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

      start();
      });
  
  };

consoleClear = function(){
  console.log('\033c');
};
function showLowInventory() {
  
  consoleClear();

  console.log("Sorry this COMMAND is not available at the moment. Please check back soon as we are always making improvements to the user exprerience.".red);
  // query the database for all items up for sale
  // connection.query("SELECT item_id,product_name,price,stock_qty FROM products", function(err, inventory) {
    
  //   if (err) throw err;
  //   // Show a terminal table brought in by clolumnify
  //     console.log("Bamazon Products".blue);
  //     console.log("--------------------------------------------------------------------------".blue);

  //     console.log("><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><".blue);
  //     console.log("--------------------------------------------------------------------------".blue);
  //     var columns = columnify(inventory,{minWidth: 15,config: {price: {align: "right"}}})
  //     console.log(columns)
      // for (var i = 0; i < inventory.length; i++) {

      //   console.log("Item ID: " + inventory[i].item_id + " \n\r | Product: " + inventory[i].product_name + "\n\r | Department: " + inventory[i].department_name + " \n\r | Price: " +  inventory[i].price);

  setTimeout(start, 3000);
      // });
  
};

consoleClear = function(){
  console.log('\033c');
};
function restockInventory() {
  // query the database for all items up for sale
  connection.query("SELECT item_id,product_name,price,stock_qty FROM products", function(err, inventory) {
    
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
              message: "What's the Id of the  product you would like to restock?",
              name: "id"
            },

               {
              type: "input",
              message: "How many are you adding to the inventory?",
              name: "quantity"
            }
        ]).then(function(order){
            var quantity = parseInt(order.quantity);
            var itemId = order.id;
            connection.query("SELECT * FROM products WHERE item_id=" + itemId, function(err, selectedItem) {
                        if (err) throw err;
                                                         
                              //  This is the code to remove the item from inventory.
                              connection.query("UPDATE products SET stock_qty=? WHERE item_id=?", [(selectedItem[0].stock_qty + quantity), itemId],
                              function(err, inventory) {
                                if (err) throw err;
                                console.log(selectedItem[0].product_name.green + " has been updated. Reloading inventory view in a moment.")
                              // Runs the prompt again, so the user can keep shopping. Setting a timeout to give the user time to read.
                                setTimeout(showInventory, 6000);
                                setTimeout(consoleClear, 6000);
                              });  // Ends the code to remove item from inventory.

                          });

        });

  });
};
function addProduct() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the product you would like to submit?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your auction in?"
      },
      {
        name: "price",
        type: "input",
        message: "How much does this product cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
        {
        name: "quantity",
        type: "input",
        message: "How many will you be stocking in our inventory?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
            }
          return false;
          }
        }
        
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.category,
          price: answer.price,
          stock_qty: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your product has been added successfully!");
          // re-prompt the user for if they want to bid or post
          showInventory();
          setTimeout(consoleClear, 6000);
          setTimeout(start, 6000);
        }
      );
    });
}

function quitConsole() {
  
    console.log("Thank You for using Bamazon Manager Terminal.".blue);
    process.exit();     
};

// console.reset = function (){
//   return process.stdout.write('\033c');



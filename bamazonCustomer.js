const inquirer = require("inquirer");
const table = require("table").table;
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  //changed to 3308 cause 3306 stopped working
  port: 3308,

  // Your username
  user: "root",

  // Your password
  password: "KhalilMack52",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // Use the table functionality
  // const productTable = new Table({
  //   head: ["ID", "brand", "shoename", "colorway", "price", "stock"]
  // });
  start();
});

const products = [
  {
    id: 1,
    brand: "Adidas",
    shoename: "yeezy 350's - sesame",
    colorway: "sesame",
    price: 249.0,
    stock: 10
  }
];

const start = () => {
  // Running this application will first display all of the items available for sale.
  //Include the ids, names, and prices of products for sale.

  displayProducts();
  //prompt app to user
  getUserAction();
  //The first should ask them the ID of the product they would like to buy.
  // The second message should ask how many units of the product they would like to buy.
  inquirer
    .prompt([
      {
        name: "choice",
        type: "input",
        message: "Please enter ID of Sneaker you're interested in:"
      },
      //if answer is correct prompt again
      {
        name: "units",
        type: "input",
        message: "How many:"
      }
    ])
    .then(answers => {
      //Validate that its an existing id using a filter

      const isValid =
        products.filter(product => product.id === answers.choice).length > 0;

      //validate there is enough stock or output
      //`Insufficient quantity!`

      //Once the update goes through, show the customer the total cost of their purchase.
      console.log(answers);
      //*connect to the db and update the quanitiy

      switch (
        answers.choice
        // case statements
      ) {
      }
    });
};

const getUserAction = () => {};
const displayProducts = () => {
  //connect to db
  // select products
  //display each product (can use package for display)

  //figure out how to use table package to put in headers
  // head[("ID", "brand", "shoename", "colorway", "price", "stock")],

  const data = products.map(product => [
    product.id,
    product.brand,
    product.shoename,
    product.colorway,
    product.price,
    product.stock
  ]);
  console.log(table(data));
};
start();

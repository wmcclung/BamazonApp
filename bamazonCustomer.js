const inquirer = require("inquirer");
// const table = require("table").table;
const mysql = require("mysql");

let currentDept;
let userTotal;

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  //changed to 3308 cause 3306 stopped working
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "KhalilMack52",
  database: "bamazondb"
});



connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // Use the table functionality
  // const productTable = new Table({
  //   head: ["ID", "brand", "shoename", "colorway", "price", "stock"]
  // });
  beginningPrompt();
});



function beginningPrompt() {
  console.log('Welcome to BamaStockXYZ');
  inquirer.prompt([
    {
    type: 'confirm',
    name: 'confirm',
    message: 'browse the rotation?',
    default: true
    }
  ]).then(function(answers) {
    if(answers.confirm) {
      showAllShoes();
    } else {
      console.log('peace');
      connection.end();
    }
  });
}



function promptUserInput() {
  
  inquirer
    .prompt([
      {
        type: 'input',
			name: 'item',
        message: "Please enter ID of Sneaker you're interested in:",
        validate: function checkForIntegers(item) {
          const reg = /^\d+$/;
          return reg.test(item) || 'Please enter a numerical value for the ID.';
        }
      },
      //if answer is correct prompt again
      {
        type: "input",
        name: "itemQuantity",
        message: "How many pairs would you like?",
        validate: function checkForIntegers(itemQuantity) {
          const reg = /^\d+$/;
          return reg.test(itemQuantity) || 'Please enter a numerical value for your amount.';
        }
      }
    ])
    .then(function(answers) {
      //Validate that its an existing id using a filter
        let sql = 'SELECT ?? FROM ?? WHERE = ?';
        let values = ['*' , 'shoes' , 'id' , answers.item];

        sql = mysql.format(sql, values);
		connection.query(sql, function(err, results) {
			if (answers.itemQuantity <= results[0].stock) {
				console.log('\nGreat choice!\n');
				updateStock()
				//update database
				let amountPurchased = results[0].stock - answers.itemQuantity;
				let updateStock = connection.query(
					'UPDATE shoes SET ? WHERE ?',
						[
							{
								stock: amountPurchased
							},
							{
								id: results[0].id
							}
						],
					function(err, results) {
						console.log(`${results.affectedRows} product updated!`);
						beginningPrompt();
					}
				);

				// give user total 
				userTotal = parseFloat((results[0].price * answers.itemQuantity).toFixed(2));
				console.log(`Your total is $${userTotal}\n`);
				
				
				
				
			} else {
				console.log('\nNot enough in stock. \nPlease select less quanitity\n');
				promptUserInput();
			}
		});		
	});
}
      function showAllShoes() {
        let sql = 'SELECT ?? FROM ??';
        let values = ['*', 'shoes'];
        sql = mysql.format(sql, values);
        connection.query(sql, function(err, results, fields) {
          if (err) throw err;
          for (let i = 0; i < results.length; i++) {
            console.log(` \nID: ${results[i].id}     Name: ${results[i].shoename}     Price: ${results[i].price} Colorway: ${results[i].colorway} Number in Stock: ${results[i].stock} \n-------------------------------------------------------------------------------------- \n`);
          }
          promptUserInput();
        });
      }
      
      function anotherChoice() {
        inquirer.prompt([
          {
            type: 'confirm',
            name: 'orderAgain',
            message: 'Would you like to place another order?',
            default: true
          }
        ]).then(function(answers) {
          if (answers.orderAgain) {
            anotherChoice();
          } else {
            console.log('Hope to see you again! Have a BAM!-tabulous day!');
            connection.end();
          }
        });
      }
//       const isValid =
//         products.filter(product => product.id === answers.choice).length > 0;

//       //validate there is enough stock or output
//       //`Insufficient quantity!`

//       //Once the update goes through, show the customer the total cost of their purchase.
//       console.log(answers);
//       //*connect to the db and update the quanitiy

//       switch (
//         answers.choice
//         // case statements
//       ) {
//       }
 
// };

// const getUserAction = () => {};
// const displayProducts = () => {
//   //connect to db
//   // select products
//   //display each product (can use package for display)

  //figure out how to use table package to put in headers
  // head[("ID", "brand", "shoename", "colorway", "price", "stock")],

// 
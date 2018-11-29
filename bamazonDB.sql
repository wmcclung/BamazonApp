DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE shoes
(
    id INT NOT NULL
    AUTO_INCREMENT,
  brand VARCHAR
    (255) NULL,
  shoename VARCHAR
    (255) NULL,
  colorway VARCHAR
    (255) NULL,
  price DECIMAL
    (10,2) NULL,
  
  stock INT NULL,
  PRIMARY KEY
    (id)
);

    INSERT INTO shoes
        (brand, shoename, colorway, price,stock )
    VALUES
        ("Adidas", "yeezy 350's", "Sesame", 249.00, 25),
        ("Jordan", "Jordan 1 Retro", "Shattered Backboard", 350.00, 100),
        ("Puma", "Blaze of Glory x sneaker freaker", "Blood Bath", 200.00, 150),
        ("Nike", "Air Monarch", "White and Navy", 20.00, 9999999),
        ("Jordan", "Jordan 4 Retro", "Cactus Jack", 350.00, 100),
        ("Adidas", "Adidas X Jeremy Scott 3.0s", "Gold", 500.00, 20),
        ("Adidas", "Adidas x Ronnie Fieg", "Ultra Boost Mid", 500.00, 100),
        ("Puma", "Phantaci X Puma", "King of Beasts", 2000.00, 2),
        ("Jordan", "Jordan 1 SB", "Lance Mountain", 300.00, 1000),
        ("Nike", "Foamposite", "Aurora Green", 300.00, 2000),
        ("Nike", "Kobe 10 Elite High", "Rose Gold", 300.00, 2000),
        ("Nike", "Kyrie 1", "All Stars", 300.00, 2000);
    





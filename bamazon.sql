
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_qty INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Playstation 4", "Electronics", 299.99, 10);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("XBOX One", "Electronics", 299.99, 10);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Nike Air Max", "Shoes", 89.99, 30);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Chanel Quilted Purse", "Accessories", 600.00, 8);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Lucky Brand - 181 Relaxed Straight Jeans", "Men's Clothing", 120.00, 50);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Ray Ban Aviators", "Accessories", 180.00, 25);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Samsung QLED 65inch TV", "Electronics", 2299.00, 10);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Anthropologie - Alameda Blouse", "Women's Clothing", 118.00, 15);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Cannondale Synapse Alloy Disc Bike", "Exercise", 1061.00, 15);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Nature Made B12 1000 mcg Tablets", "Health", 11.00, 50);










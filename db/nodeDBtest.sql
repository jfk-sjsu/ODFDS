#!/bin/bash

# Replace the line directly below this with your mysql path, in my case it is in the xxamp folder

#/Applications/xampp/xamppfiles/bin/mysql -u root -p  -t <<EOF

CREATE DATABASE odfdsdb;

use odfdsdb; 

SET FOREIGN_KEY_CHECKS = 0;
DROP table IF EXISTS restaurant;
DROP table IF EXISTS driver;
DROP table IF EXISTS orders;
SET FOREIGN_KEY_CHECKS = 1;

\! echo ""
\! echo "Creating CS160 Project Tables: "
\! echo ""

CREATE TABLE restaurant (RestID INT NOT NULL AUTO_INCREMENT,
            					RestLogin VARCHAR(30),
            					RestPW VARCHAR(15),
						RestName VARCHAR(15),

						RestAddr VARCHAR (200),
						RestLong DOUBLE,
						RestLat DOUBLE,
						RestPhone VARCHAR(12),
						PRIMARY KEY (RestID));

CREATE TABLE driver (DriverID INT NOT NULL AUTO_INCREMENT,
          				DriverLogin VARCHAR(30),
          				DriverPW VARCHAR(20),
					DriverName VARCHAR(15),
					DriverLong DOUBLE,
					DriverLat DOUBLE,
					DriverPhone VARCHAR(12),
					Available BOOLEAN,
					DriverPay INT,
					DriverCar VARCHAR(25),
					DriverLicense VARCHAR(15),
					PRIMARY KEY (DriverID));

CREATE TABLE orders (OrderID INT NOT NULL AUTO_INCREMENT,
					OrderVal INT,
					CustName VARCHAR (30),
					CustLat DOUBLE,
					CustLong DOUBLE,
					CustAddr VARCHAR (200),
					OrderPickedUp BOOLEAN,
					OrderComplete BOOLEAN,
					RestID INT,
					DriverID INT,
					OrderCreationTime BIGINT,
					OrderPickupTime BIGINT,
					OrderDeliveryTime BIGINT,
					PRIMARY KEY (OrderID),
					FOREIGN KEY (RestID) REFERENCES restaurant(RestID)
\! cant have foreign key here. causes order to require a driver on creation before one is assigned. 					FOREIGN KEY (DriverID) REFERENCES driver(DriverID)
					);
CREATE USER 'dbuser'@'%' IDENTIFIED WITH mysql_native_password BY 'example';
GRANT ALL PRIVILEGES ON odfdsdb.* TO 'dbuser'@'%';
INSERT INTO restaurant(RestLogin, RestPW, RestName, RestAddr, RestLong, RestLat, RestPhone) VALUES ('mama@mia.com', 'asdf', 'mama mia', '200 e. Hamilton ave 95008',-121.9465556, 37.2939405, '408-555-1212');
INSERT INTO restaurant(RestLogin, RestPW, RestName, RestAddr, RestLong, RestLat, RestPhone) VALUES ('lou@lous.com', 'asdf', 'lous diner', 'far away ',-121.9465556, 34.2939405, '408-555-1212');
INSERT INTO orders(OrderVal, CustName, CustLong, CustLat, CustAddr, OrderPickedUp, OrderComplete, RestID, DriverID, OrderCreationTime, OrderPickupTime, OrderDeliveryTime) VALUES (1,'cust1',-121, 34, 'far away', 0,0,2,0,0,0,0);
INSERT INTO orders(OrderVal, CustName, CustLong, CustLat, CustAddr, OrderPickedUp, OrderComplete, RestID, DriverID, OrderCreationTime, OrderPickupTime, OrderDeliveryTime) VALUES (1,'cust2',-121, 37, 'far away', 0,0,2,0,0,0,0);
INSERT INTO orders(OrderVal, CustName, CustLong, CustLat, CustAddr, OrderPickedUp, OrderComplete, RestID, DriverID, OrderCreationTime, OrderPickupTime, OrderDeliveryTime) VALUES (1,'cust3',-121, 37, 'far away', 0,0,1,0,0,0,0);
INSERT INTO driver(DriverLogin, DriverPW, DriverName,DriverLong,DriverLat,DriverPhone,Available,DriverPay,DriverCar,DriverLicense)VALUES("john.kennedy@sjsu.edu","asdf","john kennedy",-121,37,'000-000-0000',0,1,'car','license');

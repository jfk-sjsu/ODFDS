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
            					RestLogin VARCHAR(20),
            					RestPW VARCHAR(15),
						RestName VARCHAR(15),
						RestAddr VARCHAR (30),
						RestLong INT,
						RestLat INT,
						RestPhone VARCHAR(12),
						PRIMARY KEY (RestID));

CREATE TABLE driver (DriverID INT NOT NULL AUTO_INCREMENT,
          				DriverLogin VARCHAR(20),
          				DriverPW VARCHAR(20),
					DriverName VARCHAR(15),
					DriverLong INT,
					DriverLat INT,
					DriverPhone VARCHAR(12),
					Available BOOLEAN,
					DriverPay INT,
					PRIMARY KEY (DriverID));

CREATE TABLE orders (OrderID INT NOT NULL AUTO_INCREMENT,
					OrderVal INT,
					CustName VARCHAR (30),
					CustAddr VARCHAR (40),
					OrderPickedUp BOOLEAN,
					OrderComplete BOOLEAN,
					RestID INT,
					DriverID INT,
					PRIMARY KEY (OrderID),
					FOREIGN KEY (RestID) REFERENCES restaurant(RestID),
					FOREIGN KEY (DriverID) REFERENCES driver(DriverID)
					);

# EOF

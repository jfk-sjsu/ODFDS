#!/bin/bash

# Replace the line directly below this with your mysql path, in my case it is in the xxamp folder

/Applications/xampp/xamppfiles/bin/mysql -u root -p  -t <<EOF

use test;

SET FOREIGN_KEY_CHECKS = 0;
DROP table IF EXISTS restaurant;
DROP table IF EXISTS driver;
DROP table IF EXISTS orders;
SET FOREIGN_KEY_CHECKS = 1;

\! echo ""
\! echo "Creating CS160 Project Tables: "
\! echo ""

CREATE TABLE restaurant (RestID INT NOT NULL,
						RestName VARCHAR(15),
						RestLong INT,
						RestLat INT,
						RestPhone VARCHAR(12),
						PRIMARY KEY (RestID));

CREATE TABLE driver (DriverID INT NOT NULL,
					DriverName VARCHAR(15),
					DriverLong INT,
					DriverLat INT,
					DriverPhone VARCHAR(12),
					Available BOOLEAN,
					DriverPay INT,
					PRIMARY KEY (DriverID));

CREATE TABLE orders (OrderID INT NOT NULL AUTO_INCREMENT,
					OrderVal INT,
					OrderComplete BOOLEAN,
					RestID INT,
					DriverID INT,
					PRIMARY KEY (OrderID),
					FOREIGN KEY (RestID) REFERENCES restaurant(RestID),
					FOREIGN KEY (DriverID) REFERENCES driver(DriverID)
					);

\! echo ""
\! echo "Creating restaurants Taco Bell and Pizza Hut"
\! echo ""

INSERT INTO restaurant (RestID, RestName, RestLong, RestLat, RestPhone) 
						VALUES (1, 'Taco Bell', 22, 53, 5102223333);

INSERT INTO restaurant (RestID, RestName, RestLong, RestLat, RestPhone) 
						VALUES (2, 'Pizza Hut', 23, 54, 5103334444);

SELECT * FROM restaurant;

\! echo ""
\! echo "Creating Drivers Driver1 and Driver2"
\! echo ""

INSERT INTO driver (DriverID, DriverName, DriverLong, DriverLat, DriverPhone, Available, DriverPay)
					VALUES (1, 'Driver1', 12, 12, 5106665555, TRUE, 555555);

INSERT INTO driver (DriverID, DriverName, DriverLong, DriverLat, DriverPhone, Available, DriverPay)
					VALUES (2, 'Driver2', 12, 12, 5107774444, TRUE, 444444);

SELECT * FROM driver;

\! echo ""
\! echo "Creating Taco Bell order and assigning it to Driver1, updating him to busy"
\! echo ""

INSERT INTO orders (OrderVal, OrderComplete, RestID, DriverID)
					VALUES (12, FALSE, 1, 1);

UPDATE driver SET Available = FALSE WHERE DriverID = 1;

SELECT * FROM orders;

\! echo ""

SELECT * FROM driver;

\! echo ""
\! echo "Order has been completed, updating order as complete, driver's position and availability"
\! echo ""

UPDATE orders SET OrderComplete = TRUE WHERE OrderID = 1;

UPDATE driver SET Available = TRUE, DriverLong = 25, DriverLat = 22 WHERE DriverID = 1;

SELECT * FROM restaurant;

SELECT * FROM driver;

SELECT * FROM orders;

\! echo "CS160 DB Test Script complete!"

EOF

function _registerRestaurant(restLogin, restPW, restName, restAddr, restLong, restLat, restPhone, callback) {
  var mysql = require('mysql');
  var con = mysql.createConnection({

    host: "172.17.0.2",
    user: "dbuser",
    password: "example",
    database: "odfdsdb"

  });
  restAddr = restAddr.split(" ").join("+");
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
  });
    
  var sql = "INSERT INTO restaurant(RestLogin, RestPW, RestName, RestAddr, RestLong, RestLat, RestPhone) VALUES (?,?,?,?,?,?,?);";
    
  con.query(sql, [restLogin, restPW, restName, restAddr, restLong, restLat, restPhone], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted to restaurant, ID: " + result.insertId);
    return callback(result);
  });
  con.end();
}


exports.restNewOrder = function (orderVal, customer, custLat, custLong, custAddr, restID, callback) {
  console.log("restNewOrder called:", orderVal, customer, custAddr, restID);
  custAddr = custAddr.split(" ").join('+'); 
	
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "172.17.0.2",
    user: "dbuser",
    password: "example",
    database: "odfdsdb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
  });
    
    var sql = "INSERT INTO orders(OrderVal, CustName, CustLat, CustLong, CustAddr, OrderPickedUp, OrderComplete, RestID, DriverID) VALUES (?,?,?,?,?,?,?,?,?)";
    
    con.query(sql, [orderVal, customer, custLat, custLong, custAddr, false, false, restID, 0], function (err, result, fields) {
      if (err) throw err;
      console.log("1 record inserted to orders, ID: " + result.insertId);
      callback(result);
    });
  con.end();
}

function registerDriver(driverLogin, driverPW, driverName, driverLong, driverLat, drivePhone, driverPay, driverMake, driverLic, callback) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "172.17.0.2",
    user: "dbuser",
    password: "example",
    database: "odfdsdb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    
    var sql = "INSERT INTO driver(DriverLogin, DriverPW, DriverName, DriverLong, DriverLat, DriverPhone, Available, DriverPay, DriverCar, DriverLicense) VALUES (?,?,?,?,?,?,?,?,?,?);";
    
    con.query(sql, [driverLogin, driverPW,  driverName,  driverLong,  driverLat, drivePhone,  false,  driverPay,  driverMake,  driverLic ], function (err, result) {
      if (err) throw err;
      callback(result.insertId);
    });
  
  });
}

function createOrder(orderVal, custName, custLat, custLong, custAddr, restID, driverID, creationTime, pickupTime, delivTime) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "172.17.0.2",
    user: "dbuser",
    password: "example",
    database: "odfdsdb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    
    var sql = "INSERT INTO orders(OrderVal, CustName, CustLat, CustLong, CustAddr, OrderPickedUp, OrderComplete, RestID, DriverID, OrderCreationTime, OrderPickupTime, OrderDeliveryTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
    
    con.query(sql, [orderVal, custName, custLat, custLong, custAddr, false, false, restID, driverID, creationTime, null, null], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted to orders, ID: " + result.insertId);
    });
  
  });
}


module.exports.registerRestaurant = _registerRestaurant;
module.exports.driverReg = registerDriver;
module.exports.createOrder = createOrder;
//module.exports.mysql = mysql;


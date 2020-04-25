exports.restReg = function (restLogin, restPW, restName, restAddr, restLong, restLat, restPhone, callback) {
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
    
  var sql = "INSERT INTO restaurant(RestLogin, RestPW, RestName, RestAddr, RestLong, RestLat, RestPhone) VALUES (?,?,?,?,?,?,?);";
    
  con.query(sql, [restLogin, restPW, restName, restAddr, restLong, restLat, restPhone], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted to restaurant, ID: " + result.insertId);
    return callback(result);
  });
  con.end();
}

exports.driverReg = function (driverLogin, driverPW, driverName, driverLong, driverLat, driverPhone, driverAvailable, driverPay, driverCar, driverLicense, callback) {
 
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "172.17.0.2",
    user: "dbuser",
    password: "example",
    database: "odfdsdb"
  });
	console.log("driverReg", driverLogin, driverPW, driverName, driverLong, driverLat, driverPhone, driverAvailable, driverPay, driverCar, driverLicense);
  con.connect(function(err) {
    if (err) throw err;
 
    });
    
    var sql = "INSERT INTO driver(DriverLogin, DriverPW, DriverName, DriverLong, DriverLat, DriverPhone, Available, DriverPay, DriverCar, DriverLicense) VALUES (?,?,?,?,?,?,?,?,?,?);";

	con.query(sql, [ driverLogin, driverPW, driverName, driverLong, driverLat, driverPhone, false, driverPay, driverCar, driverLicense ], function (err, result) {
      if (err) throw err;

      return callback(result);

    });
  con.end();
}

exports.restNewOrder = function (orderVal, customer, custAddr, restID, driverID, callback) {
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
    
    var sql = "INSERT INTO orders(OrderVal, CustName, CustAddr, OrderPickedUp, OrderComplete, RestID, DriverID) VALUES (?,?,?,?,?,?,?)";
    
    con.query(sql, [orderVal, customer, custAddr, false, false, restID, driverID], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted to orders, ID: " + result.insertId);
      return callback(result);
    });
  con.end();
}

function registerDriver(driverLogin, driverPW, driverName, driverLong, driverLat, drivePhone, driverPay) {
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    
    var sql = "INSERT INTO driver(DriverLogin, DriverPW, DriverName, DriverLong, DriverLat, DriverPhone, Available, DriverPay) VALUES (:login, :pw, :name, :rlong, :rlat, :phone, :avail, :pay)";
    
    con.query(sql, { login: restLogin, pw: restPW, name: restName, rlong: restLong, rlat: restLat, phone: restPhone, avail: true, pay: driverPay}, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted to drivers, ID: " + result.insertId);
    });
  
  });
}

function createOrder(orderVal, orderComplete, restID, driverID) {
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    
    var sql = "INSERT INTO orders() VALUES (:val, :comp, :rest, :driver)";
    
    con.query(sql, { val: orderVal, comp: false, rest: restID, driver: driverID}, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted to orders, ID: " + result.insertId);
    });
  
  });
}
function registerRestaurant(){}; 

module.exports.registerRestaurant = registerRestaurant;
module.exports.registerDriver = registerDriver;
module.exports.createOrder = createOrder;
//module.exports.mysql = mysql;


exports.restReg = function (restLogin, restPW, restName, restLong, restLat, restPhone, callback) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "example",
    database: "odfdsdb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
  });
    
  var sql = "INSERT INTO restaurant(RestLogin, RestPW, RestName, RestLong, RestLat, RestPhone) VALUES (?,?,?,?,?,?);";
    
  con.query(sql, [restLogin, restPwd, restName, restLong, restLat, restPhone], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted to restaurant, ID: " + result.insertId);
    return callback(result);
  });
  con.end();
}

exports.driverReg = function (driverLogin, driverPW, driverName, driverLong, driverLat, drivePhone, driverPay, callback) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "example",
    database: "odfdsdb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    });
    
    var sql = "INSERT INTO driver(DriverLogin, DriverPW, DriverName, DriverLong, DriverLat, DriverPhone, Available, DriverPay) VALUES (?,?,?,?,?,?,?,?);";
    
    con.query(sql, [driverLogin, driverPW, driverName, driverLong, driverLat, drivePhone, true, driverPay], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted to driver, ID: " + result.insertId);
      return callback(result);
    });
  con.end();
}

exports.restNewOrder = function (orderVal, restID, driverID, callback) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "example",
    database: "odfdsdb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
  });
    
    var sql = "INSERT INTO orders(OrderVal, OrderComplete, RestID, DriverID) VALUES (?,?,?,?)";
    
    con.query(sql, [orderVal, false, restID, driverID], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted to orders, ID: " + result.insertId);
      return callback(result);
    });
  con.end();
}


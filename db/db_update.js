exports.completeOrder = function (driverId, orderID, callback) {
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
    var completedTime = Date.now();
    var sql = "UPDATE orders SET OrderComplete = true , OrderDeliveryTime = ? WHERE OrderID = ? AND DriverID = ?;";

    con.query(sql, [completedTime, orderID, driverId], function (err, result) {
      if (err) throw err;
      console.log("Order " + orderID + " completed");
      return callback(result);
    });

  con.end();
}

exports.orderPickedUp = function (driverID, orderID, callback) {
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
    var pickupTime = Date.now();
    var sql = "UPDATE orders SET OrderPickedUp = true , OrderPickupTime = ? WHERE OrderID = ? AND DriverID= ?;";

    con.query(sql, [ pickupTime, orderID, driverID ], function (err, result) {
      if (err) throw err;
      console.log("Order " + orderID + " picked up at " + pickupTime);
      return callback(result);
    });

  con.end();
}

exports.setDriverAvailable = function setDriverAvailable(driverID, callback) {
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

    var sql = "UPDATE driver SET Available = true WHERE DriverID = ?";

    con.query(sql, [ driverID ], function (err, result) {
      if (err) throw err;
      console.log("Driver ID = " + driverID + " set to available");
      return callback(result);
    });

  con.end();
}

exports.updateDriverLocation =  function(driverID, driverLat, driverLong, callback) {
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

    var sql = "UPDATE driver SET DriverLong = ? , DriverLat = ? WHERE DriverID = ?;";
    console.log("updateDriverLocation called:   " + driverID + "," + driverLat + "," + driverLong);

    con.query(sql, [ driverLong, driverLat, driverID ], function (err, result) {
      if (err) throw err;
      console.log( result);
      callback(result);
    });

  con.end();
}

exports.setDriverUnavailable = function(driverID, callback) {
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

    var sql = "UPDATE driver SET Available = false WHERE DriverID = ?";

    con.query(sql, [ driverID ], function (err, result) {
      if (err) throw err;
      console.log("Driver ID = " + driverID + " set to unavailable");
      return callback(result);
    });

  con.end();
}

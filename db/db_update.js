function completeOrder(orderID, callback) {
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
    
    var sql = "UPDATE orders SET OrderComplete = true WHERE OrderID = ?;";
    
    con.query(sql, [orderID], function (err, result) {
      if (err) throw err;
      console.log("Order " + orderID + " completed");
      return callback(result);
    });
  
  con.end();
}

function orderPickedUp(orderID, callback) {
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
    
    var sql = "UPDATE orders SET OrderPickedUp = true WHERE OrderID = ?;";
    
    con.query(sql, [ orderID ], function (err, result) {
      if (err) throw err;
      console.log("Order " + orderID + " picked up");
      return callback(result);
    });
  
  con.end();
}

function setDriverAvailable(driverID, callback) {
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
      console.log("Driver ID = " + DriverID + " set to available");
      return callback(result);
    });
  
  con.end();
}

function setDriverUnavailable(driverID, callback) {
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
      console.log("Driver ID = " + DriverID + " set to unavailable");
      return callback(result);
    });
  
  con.end();
}


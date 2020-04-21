function completeOrder(orderID, callback) {
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
    
    var sql = "UPDATE orders SET OrderComplete = true WHERE OrderID = ?;";
    
    con.query(sql, [orderID], function (err, result) {
      if (err) throw err;
      console.log("Order " + orderID + " completed");
      return callback(result);
    });
  
  con.end();
}

function setDriverAvailable(DriverID, callback) {
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
    
    var sql = "UPDATE driver SET Available = true WHERE DriverID = ?";
    
    con.query(sql, [DriverID], function (err, result) {
      if (err) throw err;
      console.log("Driver ID =" + DriverID + " set to available");
      return callback(result);
    });
  
  con.end();
}
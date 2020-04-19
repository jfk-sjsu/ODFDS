var mysql = require('mysql');

function registerRestaurant(restLogin, restPW, restName, restLong, restLat, restPhone) {
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
    
    var sql = "INSERT INTO restaurant(RestLogin, RestPW, RestName, RestLong, RestLat, RestPhone) VALUES (:login, :pw, :name, :rlong, :rlat, :phone)";
    
    con.query(sql, { login: restLogin, pw: restPW, name: restName, rlong: restLong, rlat: restLat, phone: restPhone }, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted to restaurant, ID: " + result.insertId);
    });
  
  });
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


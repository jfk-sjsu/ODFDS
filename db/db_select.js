exports.driverGet = function (dLogin, callback) {
	var mysql = require('mysql');
	console.log("driverGet called. dLogin = : " + dLogin);


    var con = mysql.createConnection({
		host: "172.17.0.2",
		user: "dbuser",
        password: "example",
        database: "odfdsdb"
    });

    con.connect(function(err) {
        if (err) throw err;
    });

	var sql = "SELECT DriverID, DriverLogin, DriverPW, DriverName from driver WHERE DriverLogin = ?;";

	con.query(sql, [ dLogin ], function (err, result, fields) {
		if (err) {
			console.log("err in driverGet" + err.message);
			callback(null);
		}
		callback(result);
	});

    con.end();

}

exports.restGet = function (email, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

    con.connect(function(err) {
        if (err) throw err;
    });

        var sql = "SELECT * from restaurant WHERE RestLogin = ?";

        con.query(sql, [ email ], function (err, result, fields) {
		if (err) {
			console.log("err in restGet" + err.message);
			callback(null);
		}
		if(result.length == 0) {callback("no such restaurant"); return}
		console.log("restGet: " + result[0]);
		callback(result[0]);
    con.end();
	});
}
exports.orderGet = _orderGet;

function _orderGet(orderID, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });
     console.log("orderGet " + orderID);
     var sql = 'SELECT orders.OrderID, orders.OrderVal, orders.CustName, orders.CustAddr, orders.CustName, restaurant.RestName, restaurant.RestAddr FROM orders INNER JOIN restaurant ON orders.RestID=restaurant.RestID WHERE orders.OrderID=?;'

    con.query(sql, [ orderID ], function (err, result, fields) {
        if (err) throw err;

        callback(result);

    });
    con.end();
}
exports.retrieveDriverOrder = _retrieveDriverOrder;

function _retrieveDriverOrder(driverID, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });
     var sql = 'SELECT orders.OrderID, orders.OrderVal, orders.CustName, orders.CustAddr, orders.CustName, restaurant.RestName, restaurant.RestAddr, orders.OrderPickedUp FROM orders INNER JOIN restaurant ON orders.RestID=restaurant.RestID WHERE orders.DriverID=? AND orders.OrderComplete = false;'

    // var sql = "SELECT * from orders WHERE DriverID = ?;";

    con.query(sql, [ driverID ] , function (err, result, fields) {
        if (err) throw err;

        return callback(result);

    });
    con.end();
}
exports.retrieveRestOrder = _retrieveRestOrder;

function _retrieveRestOrder(restID, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });

     var sql = "SELECT OrderID, OrderVal as 'Distance', CustName as 'Customer', CustAddr AS 'Address', (SELECT DriverName from driver Where DriverID = orders.DriverID) as Driver, OrderCreationTime as 'Entered', OrderPickupTime AS 'EnRoute', OrderDeliveryTime as 'Delivered' from orders WHERE RestID = ?;";

    con.query(sql, [ restID ] , function (err, result, fields) {
        if (err) throw err;

        return callback(result);

    });
    con.end();
}
exports.getRestInfo = _getRestInfo;

function _getRestInfo(restID, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });

     var sql = "SELECT * from restaurant WHERE RestID = ?;";

    con.query(sql, [ restID ], function (err, result, fields) {
        if (err) throw err;

        return callback(result);

    });
    con.end();
}

function getDriverInfo(driverID, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });

     var sql = "SELECT DriverName, DriverPhone, Available, DriverCar, DriverLicense from driver WHERE DriverID = ?;";

    con.query(sql, [ driverID ], function (err, result, fields) {
        if (err) throw err;

        return callback(result);

    });
    con.end();
}

function getDriverDelivCount(driverID, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });

     var sql = "SELECT COUNT(*) AS NumDeliv from orders WHERE DriverID = ? AND OrderComplete = TRUE;";

    con.query(sql, [ driverID ], function (err, result, fields) {
        if (err) throw err;

        return callback(result.NumDeliv);

    });
    con.end();
}

function getRestDelivCount(restID, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });

     var sql = "SELECT COUNT(*) AS NumDeliv from orders WHERE RestID = ?;";

    con.query(sql, [ restID ], function (err, result, fields) {
        if (err) throw err;

        return callback(result.NumDeliv);

    });
    con.end();
}

function _retrieveOpenOrderForDriver(driverID, callback) {
	console.log("_retrieveOpenOrderForDriver", driverID);
    var mysql = require('mysql');
    var con = mysql.createConnection({
	    host: "172.17.0.2",
	    user: "dbuser",
	    password: "example",
	    database: "odfdsdb"
    });

     con.connect(function(err) {
        if (err) throw err;
    });

    var sql = 'SELECT orders.OrderID, orders.OrderVal, orders.CustName, orders.CustAddr, orders.CustName, restaurant.RestName, restaurant.RestAddr FROM '
		sql += 'orders INNER JOIN restaurant ON orders.RestID=restaurant.RestID WHERE orders.OrderID IN (select OrderID from orders WHERE ABS(CustLat - (select DriverLat from driver where DriverID = ?)) < 1 AND ABS(CustLong -(select DriverLong from driver where DriverID = ?)) < 1 AND DriverID = 0);'

		//var sql = "select OrderID from orders WHERE ABS(CustLat - (select DriverLat from driver where DriverID = ?)) < 1 AND ABS(CustLong -(select DriverLong from driver where DriverID = ?)) < 1 AND DriverID = 0;"
		con.query(sql, [ driverID, driverID ] , function (err, result, fields) {
        if (err) throw err;
        return callback(result);

    });
    con.end();
}
exports.retrieveOpenOrderForDriver = _retrieveOpenOrderForDriver;

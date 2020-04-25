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
 //   con.query("SELECT * from driver;",function (err, result,fields) { 
	//	if (err) throw err;
//		console.log(result);
//	});
	var sql = "SELECT DriverID, DriverLogin, DriverPW, DriverName from driver WHERE DriverLogin = ?;";

	con.query(sql, [ dLogin ], function (err, result, fields) {
		if (err) { 
			console.log("err in driverGet" + err.message);
			callback(null);
		}
		if(result.length == 0) {callback("no such driver")}
		console.log("driverGet: " + result[0]);
		callback(result[0]);
	});

    con.end();

}

exports.restGet = function (rLogin, callback) {
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
            
        con.query(sql, [ rLogin ], function (err, result, fields) {
		if (err) { 
			console.log("err in restGet" + err.message);
			callback(null);
		}
		if(result.length == 0) {callback("no such restaurant")}
		console.log("restGet: " + result[0]);
		callback(result[0]);
    con.end();
	});
}

function orderGet(orderID, callback) {
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
     
     var sql = "SELECT * from orders WHERE OrderID = ?;";
     
    con.query(sql, [ orderID ], function (err, result, fields) {
        if (err) throw err;
            
        return callback(result);
            
    });
    con.end();
}

function retrieveDriverOrder(driverID, callback) {
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
     
     var sql = "SELECT * from orders WHERE DriverID = ?;";
     
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
     
     var sql = "SELECT * from orders WHERE RestID = ?;";
     
    con.query(sql, [ restID ] , function (err, result, fields) {
        if (err) throw err;
            
        return callback(result);
            
    });
    con.end();
}

function getRestInfo(restID, callback) {
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
     
     var sql = "SELECT RestName, RestAddr from restaurant WHERE RestID = ?;";
     
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




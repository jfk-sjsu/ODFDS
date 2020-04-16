var mysql = require('mysql');




exports.test = function() { 
	return "test";
}


exports.connect = function () {
	var con = mysql.createConnection({
	  host: "db",
	  user: "root",
	  password: "example",
	  port: "3306"
	});
	var ret = "not connected"; 
	
	console.log("accessing db");

	con.connect(function(err) {
	if (err) throw err; 
	  console.log("Connected!");
	  ret =  "connected!"
	});
	return ret; 
}

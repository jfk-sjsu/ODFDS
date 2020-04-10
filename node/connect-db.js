exports.connect = function () {
	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "example"
	});

	con.connect(function(err) {
	  if (err) return "no db!";
	  console.log("Connected!");
	  return "connected!"
	});
}

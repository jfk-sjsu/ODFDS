var mysql = require('mysql');
	
exports.driverGet = function (dLogin, callback) {
	console.log("driverGet called");
	

    var con = mysql.createConnection({
        host: "db",
        user: "root",
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
	var sql = "SELECT DriverLogin, DriverPW from driver WHERE driverLogin = ?;";
	console.log(" dLogin = " + dLogin);
	con.query(sql, [ dLogin ], function (err, result, fields) {
		if (err) throw err;
		console.log(result[0]);
		callback(result[0]);
	});

    con.end();

}

exports.restGet = function (rLogin, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "db",
        user: "root",
        password: "example",
        database: "odfdsdb"
    });
    
    con.connect(function(err) {
        if (err) throw err;
    });
        
        var sql = "SELECT RestLogin, RestPW from restaurant WHERE RestLogin = :login";
            
        con.query(sql, { login: rLogin }, function (err, result, fields) {
            if (err) throw err;
            return callback(result);
            
        });
        
    con.end();
}


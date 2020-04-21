exports.driverAuth =function (dLogin, dPW, callback) {
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
        
        var sql = "SELECT DriverLogin, DriverPW from driver WHERE driverLogin = ?;";
            
        con.query(sql, [ dLogin ], function (err, result, fields) {
            if (err) throw err;
            
            if (result[0].DriverLogin === dLogin && result[0].DriverPW === dPW) {
                return callback(true);
            }
            else {
                return callback(false);
            }
            
        });
    con.end();
}

exports.restAuth =function (rLogin, rPW, callback) {
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
            
            if (result[0].RestLogin === rLogin && result[0].DriverPW === rPW) {
                return callback(true);
            }
            else {
                return callback(false);
            }
            
        });
        
    con.end();
}


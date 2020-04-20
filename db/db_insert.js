 exports.restReg = function (restLogin, restPwd, restName, restLong, restLat, restPhone, callback) {

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
  var sql = "INSERT INTO restaurant(RestLogin, RestPW, RestName, RestLong, RestLat, RestPhone) VALUES (?,?,?,?,?,?);";
    
  con.query(sql,[restLogin, restPwd, restName, restLong, restLat, restPhone], function (err, result) {
	if (err) throw err;
    console.log("1 record inserted to restaurant, ID: " + result.insertId);
	return callback(result);
  });
  console.log("did it!"); 
  con.end();
   
}

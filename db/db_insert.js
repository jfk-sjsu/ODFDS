exports.restReg = function (restLogin, restPW, restName, restLong, restLat, restPhone) {
	
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
    
    var sql = "INSERT INTO restaurant(RestLogin, RestPW, RestName, RestLong, RestLat, RestPhone) VALUES (:login, :pw, :name, :rlong, :rlat, :phone)";
    
    con.query(sql, { login: restLogin, pw: restPW, name: restName, rlong: restLong, rlat: restLat, phone: restPhone }, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
	  return true; 
    });
  
  });
}

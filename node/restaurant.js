// restaurant API 
const dbIns = require('../db/db_insert')
const dbSel = require('../db/db_select')
const dbUpd = require('../db/db_update')


function _newOrder(orderVal, custName, custAddr, custLat, custLong, restId, callback)  {
	console.log("_newOrder called: ",orderVal, custName, custAddr, custLat, custLong, restId);
	
	dbIns.restNewOrder(orderVal, custName, custLat, custLong, custAddr, restId, function (results) {
		console.log("newOrder  db call results: ", results.insertId); 
		callback(results.insertId);
	}); 

}

function _login(email, password, callback) {
	console.log("login called: " + email,  password); 
	dbSel.restGet(email, function (result) { 
					var auth = "bad response";
					console.log("restGet says " + result.RestPW);
					if(result == null) {
						callback("No such restaurant: " + email);
						return; 
					}
					if(result.RestPW == password) {
						{
							auth = result.RestID;
						};
						
					}else {
						auth = "Bad password";
					}
					console.log("login Auth = : " + auth.toString());
					callback(auth);
	});
}
function _logoff(email, callback) {
	callback("_logoffCalled" + email); 
}

function _SignUp(email,password,name,address,phone,rLong,rLat,callback) {
		console.log("_SignUp called ",email,password,name,address,phone,rLong,rLat); 
		dbIns.restReg(email,password,name,address,rLong,rLat,phone, function (results) { 
					callback(results); 
		});
		// restLogin, restPW, restName, restAddr, restLong, restLat, restPhone, callback
}
function _getOrders(restId, callback) {
		dbSel.retrieveRestOrder(restId, function (results) { 
			callback(results);
		});
}

exports.newOrder = _newOrder; 
exports.login = _login; 
exports.logoff = _logoff;
exports.SignUp = _SignUp; 
exports.getOrders = _getOrders; 

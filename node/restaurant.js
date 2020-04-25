// restaurant API 
const dbIns = require('../db/db_insert')
const dbSel = require('../db/db_select')
const dbUpd = require('../db/db_update')


function _newOrder(restId, custName, custLat,custLong, callback) {
	callback("_newOrder called " + restId); 
}

function _login(email, password, callback) {
	callback("_loginCalled" + email); 
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
		callback("_getOrders called"); 
}

exports.newOrder = _newOrder; 
exports.login = _login; 
exports.logoff = _logoff;
exports.SignUp = _SignUp; 
exports.getOrders = _getOrders; 

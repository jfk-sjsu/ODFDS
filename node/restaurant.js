// restaurant API
const dbIns = require('../db/db_insert')
const dbSel = require('../db/db_select')
const dbUpd = require('../db/db_update')


function _newOrder(orderVal, custName, custAddr, custLat, custLong,  restId, callback)  {
	console.log("_newOrder called: ",orderVal, custName,  custAddr, custLong, custLat, restId);

	dbIns.createOrder(orderVal, custName,  custAddr, custLong, custLat, restId, function (results) {
		console.log("newOrder  db call results: ", results);
		callback(results);
	});

}

function _login(email, password, callback) {
	console.log("login called: " + email,  password);
	dbSel.restGet(email, function (result) {
					var auth = "bad response";

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
					console.log("login Auth = : " + auth);
					callback(auth);
	});
}
function _SignUp(email,password,name,address,rLat, rLong, phone,callback) {
		address = address.split(",").join("").split(" ").join("+");
		console.log("_SignUp called ",email,password,name,address,rLat, rLong,phone);
		dbIns.registerRestaurant(email,password,name,address,rLong, rLat, phone, function (results) {
					callback(results);
		});
		// restLogin, restPW, restName, restAddr, restLong, restLat, restPhone, callback
}
function _getOrders(restId, callback) {
		dbSel.retrieveRestOrder(restId, function (results) {
			results.forEach(function (order) {
				if(order.Entered != null ) {
				order.Entered = new Date(order.Entered).toISOString().
  																								replace(/T/, ' ').      // replace T with a space
  																								replace(/\..+/, '') ;
															  } else {
																order.Entered = ""
															}
				if(order.Delivered != null ) {
				order.Delivered = new Date(order.Delivered).toISOString().
  																								replace(/T/, ' ').      // replace T with a space
  																								replace(/\..+/, '') ;
															  } else {
																order.Delivered = ""
															}
				if(order.EnRoute != null ) {
				order.EnRoute = new Date(order.EnRoute).toISOString().
																									replace(/T/, ' ').      // replace T with a space
																									replace(/\..+/, '') ;
															  } else {
																order.EnRoute = ""
															}

			});
			callback(results);
		});
}

exports.newOrder = _newOrder;
exports.login = _login;
exports.SignUp = _SignUp;
exports.getOrders = _getOrders;
exports.registerRestaurant = _SignUp;

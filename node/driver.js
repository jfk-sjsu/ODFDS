const dbIns = require('../db/db_insert')
const dbSel = require('../db/db_select')
const dbUpd = require('../db/db_update')

// driver.js all the driver functions in one spot

exports.login = function ( email,  password, callback) {
// logs the driver in for work. requires password to be validated
	//console.log("login called: " + email + "," + password);
// connect to db
// get the driver's password
// compare to given password
// if true, send back their driver id and let them see the drivers' page I guess
// if false, send them to a "you failed to login" page.
console.log("login called: " + email,  password);
	dbSel.driverGet(email, function (result) {
					var auth = "bad response";
					console.log("driverGet results  = ", result);
					if( result.length == 0) {
						auth = "no such user " + email;
					} else {

						if(result[0].DriverPW == password) {
							{

							auth = result[0].DriverID;
							};

						}else {
							auth = "Bad password";
						}
					}
					callback(auth);
	});
}


exports.setActive = function( id,  driverLat,  driverLong) {
	// set's driver as active and records position.
	//driver.setDriverAvailable(id, function (results) {});
	console.log("setActive called");
	console.log("id = " + id);
	if(driverLat == 0){driverLat = 37};
	if(driverLong == 0){driverLong = -121}
	dbUpd.setDriverAvailable(id, function (results) {
							_sendLocation(id, driverLat, driverLong);
	});

}

exports.setNotActive = function( id) {
	// set's driver as not active

	console.log("setNotActive called");
	console.log("id = " + id);
	dbUpd.setDriverUnavailable(id, function (results) {});

}


exports.sendLocation = _sendLocation;

 function _sendLocation( id,  driverLat,  driverLong) {
// sends the drivers location to the database.
	if(driverLat.length == 0){driverLat = 0};
	if(driverLong.length == 0){driverLong = 0};

	console.log("_sendLocation: " + id + "," + driverLat + "," + driverLong);
	dbUpd.updateDriverLocation(id,  driverLat,  driverLong, function (results) {
								console.log("updated driver location results" + results)});


}
exports.getRestForOrder = function (orderId, callback) {
	console.log("getRestForOrder " + orderId);
	dbSel.orderGet(orderId, function (results) {
		console.log(results);
		console.log(results[0].RestID);
		dbSel.getRestInfo(results[0].RestID, function (results) {
			console.log(results);
			callback(results);
		});
	});
}

exports.selectOrder = function( driverId,orderId, callback) {
  //purpose: When a driver wants to select an order, , the drivers calls this function to request delivery. .
  // returns true or false
  // algorithm:
  //   get drivers current orders
  // 	  if two or more, return false.
  //   get openOrders(driverId)
  //      if orderId is amongst the openOrders,
  //          assign order to driver.
  //          return true;
  //      else return false;
	var ret = null;
 	dbSel.retrieveDriverOrder(driverId, function (results) {
					if(results.length > 1){ret = false;
								console.log("driver " + driverId + " has too many orders");
								callback(ret);
								return}

					dbSel.retrieveOpenOrderForDriver(driverId, function (results) {
						if(results.length == 0){ret = false;
									console.log("no open orders available for driverId " + driverId);
									callback(ret);
									return};
						results.forEach(function (item, index) {
							console.log("Processing orderId " + item.OrderID);
							if(item.OrderID == orderId){ret = true;
										console.log("found it! OrderID " + orderId + " == " +item.OrderID);
                    dbUpd.assignOrdertoDriver(driverId, orderId, function (results) {
                      callback(ret);
                    });
							};

	           });
           });
         });
}


exports.completeOrder = function( driverId, orderId, callback) {

	dbUpd.completeOrder(driverId, orderId, function (results) {
      callback(results)
  });
}


exports.SignUp = function ( name, email, password, carMakeModel, licPlate, phone, pay, callback) {
/*
   Purpose: puts a new user into the database for access
   params:
      name type:text
      username  type:text
      email  type:text
	  password 	type: text
	  secQ: 	type: text
	  secA:		type: text
	  carMakeModel	type: text
	  licPlate		type: text

   return:
      boolean success or fail
      driverId
*/
	console.log(name, email, password, carMakeModel, licPlate, phone, pay);
	var ret = dbIns.driverReg(email, password, name, 0,
						0, phone, pay, carMakeModel, licPlate,
						function(results) {

						callback(results)});

}

exports.getDetails = _getDetails;
function _getDetails(id, callback) {
	dbSel.driverGet(id, function (results) {
		callback(results);
	});
}
exports.getOrders = function(driverId, callback) {
	dbSel.retrieveDriverOrder(driverId, function (results) {
		callback(results);
	});
}
exports.getOpenOrders = function (driverId, callback) {
	console.log("getOpenOrders", driverId);
	dbSel.retrieveOpenOrderForDriver(driverId, function (results) {
    callback(results);
	});
}
exports.orderPickedUp = function (driverId, orderId, callback) {
   dbUpd.orderPickedUp(driverId, orderId, function (results) {
            callback(results);
   });


}

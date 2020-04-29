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
	if(driverLat == null){driverLat = 0};
	if(driverLong == null){driverLong = 0};

	console.log("_sendLocation: " + id + "," + driverLat + "," + driverLong);
	dbUpd.updateDriverLocation(id,  driverLat,  driverLong, function (results) {
								console.log("updated driver location results" + results)}); 
	

}

exports.ackOrderRequest = function( id,  accept) {
  //purpose: When an order is sent to a driver, the drivers calls this function to accept of decline. 
  // if accept, hand back the order id
  return "accOrderRequest stubb"
}
exports.ackCollectedOrder = function( id,  dLat,  dLong,  ack) {
/*	
  purpose: When driver is at restaurant, the system passes the order to the driver. This call acknowledges that the order is received.  
  params: 
    driverID  type:driverID 
    driverLoc type:web based location coordinates
    acknowledge type:boolean
  return: 
    boolean True if no error else Error message. 
  Notes: IF driver fails to ack, order goes back out for bid. 
*/ 
	return "ackCollectedOrder stub"; 
}

exports.ntfDeliveredOrder = function( id,  dLat,  dLong, orderId) { 
/*
  purpose: sets the driver as "active" letting the system know that the driver is available for deliveries. 
  params: 
    driverID  type:driverID 
    driverLoc type:web based location coordinates
    orderID   type:numeric ID for particular order
  return: 
    boolean True if no error else Error message. 
  Notes: 
*/
	return "ntfDeliveredOrder stub";
}


exports.logout = function ( id){
/*	
  purpose: sets the driver as "inactive" letting the system know that the driver is not available for deliveries. Also, removes the 
    driver's ID from the system. For future calls, Login will be required. 
  params: 
    driverID  type:driverID 
    driverLoc type:web based location coordinates
  return: 
    boolean True if no error else Error message. 
  Notes: calls ntfInactive to ensure driver is set inactive. 
  
*/

	return "Logout stub";
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
 


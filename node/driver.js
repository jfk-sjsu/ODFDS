const dbIns = require('../db/db_insert')
const dbSel = require('../db/db_select')
const dbUpd = require('../db/db_update')

// driver.js all the driver functions in one spot

exports.login = function ( email,  password, lat, longitude, callback) { 
// logs the driver in for work. requires password to be validated 
	//console.log("login called: " + email + "," + password);
// connect to db 
// get the driver's password
// compare to given password 
// if true, send back their driver id and let them see the drivers' page I guess
// if false, send them to a "you failed to login" page. 
	dbSel.driverGet(email, function (result) { 
					var auth = "bad response";
					//console.log("driverGet says " + Object.keys(result) );
					if(result == null) {
						callback("No such driver");
						return; 
					}
					if(result.DriverPW == password) {
						{auth = "Authenticated"};
						setActive(result.DriverId, lat, longitude);
					}else {
						auth = "Bad password";
					}
					callback(auth);
	});
}
		

exports.setActive = function( id,  driverLat,  driverLong) { 
	// set's driver as active and records position. 
	setDriverAvailable(id, function (results) {});
	sendLocation(id,  driverLat,  driverLong); 
	return " setActive stub"; 
}

exports.sendLocation = function ( id,  driverLat,  driverLong) { 
// sends the drivers location to the database. 
	updateDriverLocation(id,  driverLat,  driverLong, function (results) { }); 
	
													
	
	return "sendLocation stub";
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


exports.ntfInactive = function( id,  dLat,  dLong) { 
/*  purpose: sets the driver as "inactive" letting the system know that the driver is not available for deliveries. 
  params: 
    driverID  type:driverID 
    driverLoc type:web based location coordinates
  return: 
    boolean True if no error else Error message. 
  Notes:
*/
	return "ntfInactive stub";
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
	var ret = dbIns.driverReg(email, password, name, 10, 
						11, phone,
						true, pay, carMakeModel, licPlate, 
						function(results) { 
						console.log(results);
						callback("Authenticated")});
	 
}


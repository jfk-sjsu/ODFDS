// driver.js all the driver functions in one spot
function getDriverInfo (email) {
	// function for getting the driver info and returning an object with the driver data from 
	// database 
	return {
		email: "driver@nowhere.com",
		password: "example", 
	driverId: "ABCDEFG1234"}
}
exports.login = function ( email,  password) { 
// logs the driver in for work. requires password to be validated 

// connect to db 
// get the driver's password
// compare to given password 
// if true, send back their driver id and let them see the drivers' page I guess
// if false, send them to a "you failed to login" page. 
	var realPass = "example" ; // this will be replaced with a call to the db
	if(password == realpass) {
		return "login stubb"; 
		}
}
		

exports.setActive = function( id,  driverLat,  driverLong) { 
	// set's driver as active and records position. 
	return " setActive stub"; 
}

exports.sendLocation = function ( id,  driverLat,  driverLong) { 
// sends the drivers location to the database. 
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

exports.SignUp = function ( name, username, email, password, secQ, secA, carMakeModel, licPlate) {
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
	return "signup stubb";
}


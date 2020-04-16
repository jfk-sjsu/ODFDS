// driver.js all the driver functions in one spot

function login ( email,  password) { 
// logs the driver in for work. requires password to be validated 
	return "login stubb"; 
} 

function setActive ( id,  driverLat,  driverLong) { 
	// set's driver as active and records position. 
	return " setActive stub"; 
}

function sendLocation ( id,  driverLat,  driverLong) { 
// sends the drivers location to the database. 
	return "sendLocation stub";
}

function ackOrderRequest ( id,  accept) {
  //purpose: When an order is sent to a driver, the drivers calls this function to accept of decline. 
  // if accept, hand back the order id
  return "accOrderRequest stubb"
}
function ackCollectedOrder ( id,  dLat,  dLong,  ack) {
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

function ntfDeliveredOrder ( id,  dLat,  dLong, orderId) { 
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


function ntfInactive ( id,  dLat,  dLong) { 
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
function Logout( id) {
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
/*
function SignUp( email,  
   Purpose: puts a new user into the database for access
   params: 
      firstname type:text
      lastname  type:text
      password  type:text
   return:
      boolean success or fail
      driverId
*/

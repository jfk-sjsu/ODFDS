const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //
var session = require('express-session');

const driver = require('./node/driver')
const rest = require('./node/restaurant')
const geo = require('./node/geolocation')
const tableify = require('./node/tableify.js')


app.use(express.static('/website/'))
app.use(session({secret: 'verySecretP@ssw0rd'}));

/*
app.post('/driver/getRestForOrder', function (req,res) {

		if(req.session.did == null) {
		res.send("[]");
	};
	driver.getRestForOrder(req.body.orderId, function (results) {
		console.log(results);
		res.send(results);
	});
});
*/

app.post('/driver/Login', function (req,res) {
	console.log('/driver/Login',req.body.email, req.body.psw,
				req.body.dLat, req.body.dLong);
	//if(req.body.email == null) {res.send("invalid username");return};
	//if(sess != null){res.send("User " + sess.username + " is currently logged in. Please log out and try again")}return;

	driver.login(req.body.email,req.body.psw,
					function(results) {

					if(typeof(results) == 'number') {
						var sess=req.session;
						sess.username = req.body.email;
						sess.loginType = "d";
						sess.did = results;
						console.log('sess.did = ' + sess.did);
						console.log('dLat, dLong ',req.body.dLat, req.body.dLong);
						//if(typeof(req.body.dLat) == 'number' && typeof(req.body.dLong == 'number')) {
							console.log("main calling driver.setACtive " , req.body.dLat, req.body.dLong);
							driver.setActive(results, req.body.dLat, req.body.dLong);
						//}
						res.redirect('/driverMain.html');
					} else
					{
						res.send(results);
					}
				});

});
app.get('/driver/logoff', function (req,res) {
		if(req.session != null) {
			if(req.session.loginType == "d") {
				var id = req.session.did;
				driver.setNotActive(id);
				req.session.destroy();
			}
	}
	res.redirect('/index.html');
	});


app.get('/', (req, res) => req.send(index.html));


app.post('/rest/SignUp', function (req, res) {
	//email,password,name,address,phone,rLong,rLat,callback
	var rLat = 0.0
	var rLong = 0.0
	var latLong = geo.getLatLong(req.body.address + " " + req.body.zip, function (results) {
		rLat = results.lat;
		rLong = results.lng;
		console.log("rLat " + rLat + " rLong " + rLong);

		var ret = rest.registerRestaurant(req.body.email,
						req.body.password,
						req.body.name,
						req.body.address + " " + req.body.zip,
						rLat,
						rLong,
						req.body.phone,
						function(results) {
						console.log(results);
						res.redirect('/signin.html')});
	 console.log("back to main");
	});
});

app.post('/driver/SignUp', function (req, res) {

	try {
		driver.SignUp(req.body.name, req.body.email,
					req.body.psw,
					req.body.carMake,
					req.body.license,
					req.body.phone,
					req.body.pay,
						function(results) {
						console.log(results.insertId);

						res.redirect('/signin.html');

					});
	} catch (err)
	{
		res.send( err.message);
	}

});
app.post('/rest/newOrder', function (req,res) {

	if(req.session.did  == null) {
		res.send("no one logged in!");
	}
	else
	{

		var restId = req.session.did;
		var addr = req.body.address + "+" + req.body.zip;
		addr = addr.split(" ").join("+");
		// need to get distance from restaurant to cust
			geo.getLatLong(addr, function (response) {
				var latitude = response.lat;
				var longitude= response.lng;
				console.log("newOrder req.session.latLng: ", req.session.latLng);
				console.log("newOrder req.session.username: ", req.session.username);
				geo.getDistance(req.session.latLng, response, function (results) {
						var orderVal = results;
						console.log(orderVal);
						rest.newOrder(orderVal, req.body.name, addr, latitude, longitude,
						  restId, function (response) {
							if(typeof(response) == 'number') {
								res.redirect('/restaurantMain.html');
							}
							else
							{
								res.send(response);
							}
				});
			});
	});

}
});

app.get('/rest/getOrders', function (req, res) {
	if(req.session.did == null || req.session.loginType != "r") { res.send('[]'); return; };

	rest.getOrders(req.session.did, function (results) {

		res.send(tableify.tableify(results));
	});
});

app.post('/rest/login', function (req,res) {

	rest.login(req.body.email,req.body.psw,
					function(results) {
					if(req.session.did != null) {res.send("already logged in." + req.session.username); return};
					if(typeof(results) == 'number') {
						var sess=req.session;
						req.session.loginType = "r";
						req.session.username = req.body.email;
						req.session.did=results;
						rest.getAddress(sess.did, function (results) {
							console.log("rest addr: " , results);
							req.session.latLng = {lat: results[0].RestLat, lng: results[0].RestLong};
							console.log("req.session.latLng: ",req.session.latLng )
							res.redirect('/restaurantMain.html');
						});

					} else
					{
						res.send(results);
					}
				});

});
app.get('/rest/logoff', function (req,res) {
	if(req.session.loginType == "r") {
		req.session.destroy();
	}
	res.redirect('/index.html');
	});
/*
app.post('/driver/getDriverDetails', function (req,res) {
		if(req.session.username == null) {
						res.send("[]]");
						return;
		} else
		{
			driver.getDetails((req.session.username), function (results) {
				res.send(results);
			});
		}
});
*/

app.get('/driver/getAllOrders/', function (req, res) {
	if(req.session.did == null || req.session.loginType != "d") { res.send("[]"); return; };

	driver.getAllOrders(req.session.did, function (results) {
		res.send(tableify.tableify(results));
	});
});

app.get('/driver/getOrders/', function (req, res) {
	if(req.session.did == null || req.session.loginType != "d") { res.send("[]"); return; };

	driver.getOrders(req.session.did, function (results) {
		res.send(tableify.tableify(results));
	});
});
app.get('/driver/getOrdersJson/', function (req, res) {
	if(req.session.did == null || req.session.loginType != "d") { res.send("[]"); return; };

	driver.getOrders(req.session.did, function (results) {
		res.send(results);
	});
});
app.get('/driver/reqOpenOrders/', function (req, res) {
	if(req.session.did == null || req.session.loginType != "d") { res.send("[]"); return; };
	console.log("reqOpenOrders", req.session.did);
	driver.getOpenOrders(req.session.did, function (results) {
		res.send(tableify.tableify(results));
	});
});

app.post('/driver/selectOrder/', function (req,res) {
	// the driver uses this to select which order they want to take.
	if(req.session.did == null || req.session.loginType != "d") { res.send("[]"); return; };
		driver.selectOrder(req.session.did, req.body.orderId, function (results) {
					res.redirect('/driverMain.html');
	});
});
app.post('/driver/orderPickedUp/', function (req, res) {
	if(req.session.did == null || req.session.loginType != "d") { res.send("[]"); return; };
	driver.orderPickedUp(req.session.did, req.body.orderId, function (results) {
		console.log("orderPickedUp", req.session.did, req.body.orderId);

					res.redirect('/driverMain.html'); //send(results.changedRows == 1);
	});
});
app.post('/driver/completeOrder/', function (req, res) {
	if(req.session.did == null || req.session.loginType != "d") { res.send("[]"); return; };
	driver.completeOrder(req.session.did, req.body.orderId, function (results) {
		console.log("completeOrder", req.session.did, req.body.orderId);
					console.log(results);
					res.redirect('/driverMain.html');
	});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

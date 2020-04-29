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


app.use(express.static('/website/'))
app.use(session({secret: 'verySecretP@ssw0rd'}));

var sess = null;
app.post('/driver/getRestForOrder', function (req,res) { 
		
		if(sess == null) { 
		res.send("[]"); 
	};
	driver.getRestForOrder(req.body.orderId, function (results) { 
		console.log(results); 
		res.send(results); 
	}); 
}); 

app.post('/driver/Login', function (req,res) { 
	console.log('/driver/Login',req.body.email, req.body.psw, 
				req.body.dLat, req.body.dLong); 
	//if(req.body.email == null) {res.send("invalid username");return};
	//if(sess != null){res.send("User " + sess.username + " is currently logged in. Please log out and try again")}return; 

	driver.login(req.body.email,req.body.psw, 
					function(results) { 
					
					if(typeof(results) == 'number') {
						sess=req.session;
						sess.username = req.body.email;
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
		var id = sess.did;
		sess=null; 
		driver.setNotActive(id); 
		res.redirect('/index.html'); 
	});


app.get('/', (req, res) => req.send(index.html));


app.post('/rest/SignUp', function (req, res) {
	//email,password,name,address,phone,rLong,rLat,callback
	var rLat = 0.0
	var rLong = 0.0
	var latLong = geo.getLatLong(req.body.address + " " + req.body.zip, function (results) { 
		rLat = results.latitude; 
		rLong = results.longitude; 
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
	var orderVal = 1.00; 
	if(sess == null) { 
		res.send("no one logged in!"); 
	}
	else 
	{
		var restId = sess.did; 
		geo.getLatLong(req.body.address + req.body.zip, function (latLong) { 
			var cLat = latLong.latitude; 
			var cLong = latLong.longitude; 
			console.log("/ret/newOrder results for cLat and cLong", cLat, cLong)	
			rest.newOrder(orderVal, req.body.name, req.body.address + " " + req.body.zip, 
			 	cLat,  cLong, restId, function (response) { 
				if(typeof(response) == 'number') { 
					res.redirect('/restaurantMain.html');
				} 
				else 
				{
					res.send(response); 
				}
			});
		}); 
	}
	
});

app.get('/rest/getOrders', function (req, res) {
	if(sess == null) { res.send("[{'msg':'no one logged in!'}]"); return; }; 
	
	rest.getOrders(sess.did, function (results) { 
		res.send(results); 
	});
});

app.post('/rest/login', function (req,res) { 

	rest.login(req.body.email,req.body.psw,
					function(results) { 
					if(sess != null) {res.send("already logged in." + sess.username); return};
					if(typeof(results) == 'number') {
						sess=req.session;
						sess.username = req.body.email; 
						sess.did=results; 
						res.redirect('/restaurantMain.html');
					} else 
					{
						res.send(results);
					}
				});

});
app.get('/rest/logoff', function (req,res) {
	if(sess != null) {
		var id = sess.id;
		sess = null; 
		rest.setNotActive(id);
	}
		res.redirect('/index.html'); 
	});

app.post('/driver/getDriverDetails', function (req,res) { 
		if(sess == null) { 
						res.send("user not logged in"); 
						return; 
		} else 
		{ 
			driver.getDetails((sess.username), function (results) {
				res.send(results);
			});
		}
});
		

app.get('/driver/getOrders', function (req, res) {
	if(sess == null) { res.send("[{'msg':'no one logged in!'}]"); return; }; 
	
	driver.getOrders(sess.did, function (results) { 
		res.send(results); 
	});
});
app.post('/driver/reqOpenOrders/', function (req, res) { 
	if(sess == null) { res.send("no one logged in!"); return; }; 
	console.log("reqOpenOrders", sess.did);
	driver.getOpenOrders(sess.did, function (results) { 
		res.send(results); 
	});
});

app.post('/driver/selectOrder/', function (req,res) { 
	// the driver uses this to select which order they want to take. 
		if(sess == null) { res.send("[{'msg':'no one logged in!'}]"); return; }; 
		driver.selectOrder(sess.did, req.body.orderId, function (results) { 
					res.send(results); 
	});
}); 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //
var cookieParser = require('cookie-parser');
app.use(cookieParser());

const driver = require('./node/driver')
const rest = require('./node/restaurant')

app.use(express.static('/website/'))

app.post('/driver/Login', function (req,res) { 

	driver.login(req.body.username,req.body.password,
					req.body.dLat, 
					req.body.dLong, 
					function(results) { 
					console.log(typeof(results ));
					if(typeof(results) == 'number') {
						driver.setActive(results, req.body.dLat, req.body.dLong);
						res.redirect('/mainDriver.html');
					} else 
					{
						res.send(results);
					}
				});

});
app.post('/driver/logoff', function (req,res) { 
		driver.setNotActive(req.body.driverId);
		res.send("Driver " + req.body.driverId + " not active"); 
	});

app.post('/driver/setActive', function (req,res) { 

	driver.login(req.body.DriverId,
					req.body.dLat, 
					req.body.dLong, 
					function(results) { 
					console.log(typeof(results ));
					if(typeof(results) == 'number') {
						res.redirect('/mainDriver.html');
					} else 
					{
						res.send(results);
					}
				});

});
app.get('/', (req, res) => req.send(index.html));


app.post('/rest/SignUp', function (req, res) {
	//email,password,name,address,phone,rLong,rLat,callback
	var ret = rest.SignUp(req.body.email,
						req.body.password,
						req.body.name, 
						req.body.address + " " + req.body.zip,
						req.body.phone,
						req.body.rLat,
						req.body.rLong,
						function(results) { 
						console.log(results);
						res.send(results)});
	 console.log("back to main");
	 
});

app.post('/driver/SignUp', function (req, res) {

	try {
		driver.SignUp(req.body.name, req.body.email, 
					req.body.password, 
					req.body.carMake, 
					req.body.license,
					req.body.phone,
					req.body.pay,
					req.body.dLat,
					req.body.dLong,
						function(results) { 
						console.log(results.insertId);
						driver.setActive(results.insertId,req.body.dLat,req.body.dLong);
						res.redirect('/mainDriver.html');
						
					});
	} catch (err)
	{
		res.send( err.message);
	}
	
});
app.post('/rest/newOrder', function (req,res) {
	res.send("newOrder called");
});

app.post('/rest/getOrders', function (req, res) {
	res.send("getOrders called"); 
});

app.post('/rest/login', function (req,res) { 

	rest.login(req.body.username,req.body.password,
					function(results) { 
					console.log(typeof(results ));
					if(typeof(results) == 'number') {
						res.redirect('/mainRestaurant.html');
					} else 
					{
						res.send(results);
					}
				});

});
app.post('/rest/logoff', function (req,res) { 
		rest.setNotActive(req.body.driverId);
		res.send("Driver " + req.body.driverId + " not active"); 
	});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

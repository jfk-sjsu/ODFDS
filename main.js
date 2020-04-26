const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //
var session = require('express-session');

const driver = require('./node/driver')
const rest = require('./node/restaurant')


app.use(express.static('/website/'))
app.use(session({secret: 'verySecretP@ssw0rd'}));

var sess = null;

app.post('/driver/Login', function (req,res) { 

	driver.login(req.body.username,req.body.password,
					req.body.dLat, 
					req.body.dLong, 
					function(results) { 
					console.log(typeof(results ));
					if(typeof(results) == 'number') {
						sess=req.session;
						sess.username = req.body.username;
						sess.did = results;
						console.log('sess.did = ' + sess.did);
						driver.setActive(results, req.body.dLat, req.body.dLong);
						res.redirect('/driverMain.html');
					} else 
					{
						res.send(results);
					}
				});

});
app.post('/driver/logoff', function (req,res) { 
		var id = sess.did;
		sess=null; 
		driver.setNotActive(id); 
		res.send("Driver "  + id + " not active"); 
	});

app.post('/driver/setActive', function (req,res) { 

 

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
						res.redirect('/signin.html')});
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
			
		rest.newOrder(orderVal, req.body.name, req.body.address + " " + req.body.zip, 
		req.body.cLat, req.body.cLong, restId, function (response) { 
			if(typeof(response) == 'number') { 
				res.redirect('/restaurantMain.html');
			} 
			else 
			{
				res.send(response); 
			}
		});
	}
	
});

app.post('/rest/getOrders', function (req, res) {
	if(sess == null) { res.send("no one logged in!"); return; }; 
	
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
app.post('/rest/logoff', function (req,res) {
		var id = sess.id;
		sess = null; 
		rest.setNotActive(id);
		res.send("Restaurant " + id + " logged off. "); 
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
		
			

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

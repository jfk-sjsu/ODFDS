const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //


const driver = require('./node/driver')

app.use(express.static('/website/'))

app.post('/driver/Login', function (req,res) { 

	var ret = driver.login(req.body.email,req.body.psw,
							req.body.lat, 
							req.body.longitude, 
							function(results) { 
							console.log(results);
							if(results == "Authenticated") {
								res.redirect('/mainDriver.html');
							} else 
							{
								res.send(results);
							}
						});
	
});
app.get('/', (req, res) => req.send(index.html));

/*
app.post('/rest/Reg', function (req, res) {
	var ret = dbIns.restReg(req.query.uname, 
						req.query.psw, 
						req.query.name, 10, 
						11, "(408)379-3333", 
						function(results) { 
						console.log(results);
						res.send(results)});
	 console.log("back to main");
	 
});
*/
app.post('/driver/SignUp', function (req, res) {
	console.log(req.body.uname, req.body.psw);
	
	var ret = driver.SignUp(req.body.name, req.body.email, 
						req.body.psw, 
						req.body.carMake, 
						req.body.license,
						req.body.phone,
						req.body.pay,
							function(results) { 
							console.log(results);
							if(results == "Authenticated") {
								res.redirect('/mainDriver.html');
							} else 
							{
								res.send(results);
							}
						});
	 console.log("back to main");
	 
});
													


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require('express')
const app = express()
const port = 3000

const driver = require('./node/driver')
const dbIns = require('./db/db_insert')
const dbSel = require('./db/db_select')
const dbUpd = require('./db/db_update')



app.use(express.static('/website/'))

app.post('/driver/Login', function (req,res) { 
	var ret = dbSel.driverAuth(req.query.email, 
						req.query.psw, 
						function(results) { 
						console.log(results);
						res.send(results)});
	 console.log("back to main");
	 
});
app.get('/', (req, res) => req.send(index.html));
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
app.post('/driver/SignUp', function (req, res) {
	var ret = dbIns.driverReg(req.query.uname, 
						req.query.psw, 
						req.query.name, 10, 
						11, "(408)379-3333",
						1.00, 
						function(results) { 
						console.log(results);
						res.send(results)});
	 console.log("back to main");
	 
});
														
    

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require('express')
const app = express()
const port = 3000

const driver = require('./node/driver')
const db = require('./db/db_insert')



app.use(express.static('/website/'))

app.post('/driver/Login', (req,res) => res.send(driver.login("email","password")));
app.get('/', (req, res) => req.send(index.html));
app.post('/rest/Reg', function (req, res) {
	var ret = db.restReg(req.query.uname, 
						req.query.psw, 
						req.query.name, 10, 
						11, "(408)379-3333", 
						function(results) { 
						console.log(results);
						res.send(results)});
	 console.log("back to main");
	 
});
													
    

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

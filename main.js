const express = require('express')
const app = express()
const port = 3000

const driver = require('./node/driver')
const db = require('./db/db_insert')



app.use(express.static('/website/'))

app.post('/driver/Login', (req,res) => res.send(driver.login("email","password")));
app.get('/', (req, res) => req.send(index.html));
app.post('/rest/Reg', function (req, res) {
	var ret = db.restReg(req.query.name, 
						req.query.uname, 
						req.query.email, req.query.psw, 
						req.query.securityQ, req.query.Spsw);
	if(ret) res.send("registration worked!"); 
});
													
    

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

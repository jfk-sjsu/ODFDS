const express = require('express')
const app = express()
const port = 3000
const db = require('./node/connect-db')
const reg = require('./node/driverRegistration')

app.use(express.static('html'))

//app.get('/', (req, res) => res.send(index.html))
app.get('/driver/SignUp', function(req, res){ 
    //call the nodejs function that talks to the database and hands it data 
	
	//var ret = reg.reg(req.query.fullname, req.query.email, req.query.pwd)
	var ret = req.query.body.toString();   
//	var myText = req.query.fullname; //mytext is the name of your input box
    res.send('Your Text:' +ret  ); 
}); 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

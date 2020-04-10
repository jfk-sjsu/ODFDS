const express = require('express')
const app = express()
const port = 3000
const db = require('./connect-db')

app.get('/', (req, res) => res.send(html/index.html))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

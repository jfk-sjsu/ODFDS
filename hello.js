const express = require('express')
const app = express()
const port = 3000
const db = require('./node/connect-db')
app.use(express.static('html'))

app.get('/', (req, res) => res.send(index.html))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const express = require('express')
const app = express()
const port = 8080
const country = require('./country');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/country', country)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
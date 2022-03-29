const express = require('express')
const app = express()
const port = 8080
const country = require('./country');
const allCountries = require('./data/country/all.json')
const cors = require('cors');

app.use(cors);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/country', country)

app.get('/api/countries.json',  (req, res) => {
  res.json(allCountries)
})

app.get('/api/chat', (req, res) => {
  console.log('CHAT!')
  res.json(allCountries);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
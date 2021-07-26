const allCountries = require('./data/country/all.json')
const countryList = require('./data/country/country.json')
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('getCountry: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.json(countryList)
})

router.get('/all', function (req, res) {
  res.json(allCountries)
})

module.exports = router
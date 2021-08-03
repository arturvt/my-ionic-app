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

// the short content
router.get('/all', function (req, res) {
  res.json(allCountries)
})

router.get('/AFG', (_, res) => {
  const AFG = require('./data/country/countries/AFG.json');
  res.json(AFG);
})

router.get('/ALB', (_, res) => {
  const AFG = require('./data/country/countries/ALB.json');
  res.json(AFG);
})

router.get('/DZA', (_, res) => {
  const AFG = require('./data/country/countries/DZA.json');
  res.json(AFG);
})

module.exports = router
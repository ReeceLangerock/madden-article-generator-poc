var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var resource = require('../models/resourceModel')

router.use(
  bodyParser.urlencoded({
    extended: true
  })
)
router.use(bodyParser.json())

// ID OF RESOURCE FOR TESTING
// 59111aa3414357168883348e

router.get('/', function (req, res, next) {
  getResources().then((response, error) => {
    if (error) {
      res.json(false)
    } else {
      res.json(response)
    }
  })
})
router.post('/', function (req, res, next) {})

// get gallery items and return the 50 most recent
function getResources () {
  return new Promise(function (resolve, reject) {
    resource
      .find({})
      .sort({
        dateAdded: -1
      })
      // temporary limit of 10 before query modifier parameters are added later

      .limit(10)
      .exec(function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
  })
}

module.exports = router

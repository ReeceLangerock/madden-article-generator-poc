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

router.get('/:id', function (req, res, next) {
  getIndividualResource(req.params.id).then((response, error) => {
    if (error) {
      res.json(false)
    } else {
      res.json(response)
    }
  })
})
router.post('/', function (req, res, next) {

  console.log(req.body)

})

// get gallery items and return the 50 most recent
function getIndividualResource (id) {
  return new Promise(function (resolve, reject) {
    resource.findOne(
      {
        _id: id
      },
      function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      }
    )
  })
}

module.exports = router

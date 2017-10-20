// SETUP ROUTER
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var roster = require('./../models/rosterModel')
var bodyParser = require('body-parser')
var data = require('./../data-wranglers/passingStats.json')
var statWrangler = require('./../data-wranglers/statWrangler.js')
var rosterWrangler = require('./../data-wranglers/rosterWrangler.js')

router.use(
  bodyParser.json({
    limit: '50mb'
  })
)
router.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
)

router.get('/', function (req, res, next) {
  // getRoster().then((response, error) => {
  //   if (error) {
  //     res.json(false)
  //   } else {
  //     const parsedRoster = rosterWrangler.convertRosterToObject(response)
  //     const calculation = statWrangler.parseStats(data.data)
  //     // console.log(calculation)
  //     // statWrangler.parseStats(response)
  //     res.json(response)
  //   }
  // })

  getStats().then((response, error) => {
    if (error) {
      res.json(false)
    } else {
      // const parsedRoster = rosterWrangler.convertRosterToObject(response)
      // const calculation = statWrangler.parseStats(data.data)
      // console.log(calculation)
      // statWrangler.parseStats(response)
      res.json(response)
    }
  })
})
// This accepts all posts requests!

function getRoster () {
  return new Promise(function (resolve, reject) {
    roster.find({}).exec(function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

function getStats () {
  return new Promise(function (resolve, reject) {
    db.collection('weekreg1').find({}).toArray(function (err, doc) {
      if (err) {
        reject(err)
      } else {
        console.log(doc)
        resolve(doc)
      }
    })
  })
}

function saveRoster (roster) {
  return new Promise(function (resolve, reject) {
    db.collection('roster').insertMany(roster, { ordered: false }, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve('REMOVED')
      }
    })
  })
}

function remove (label, collection) {
  return new Promise(function (resolve, reject) {
    db.collection(collection).remove({
      label: label
    }, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve('REMOVED')
      }
    })
  })
}

module.exports = router

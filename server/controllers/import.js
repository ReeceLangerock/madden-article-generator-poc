// SETUP ROUTER
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var bodyParser = require('body-parser')
var data = require('./../data-wranglers/rosterData.json')
var rosterWrangler = require('./../data-wranglers/rosterWrangler.js')
var statWrangler = require('./../data-wranglers/statWrangler.js')

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

router.get('/', function (req, res) {
  console.log('save')
  const parsed = rosterWrangler.parseRoster(data.data.rosterInfoList)
  saveRoster(parsed)
  res.json(data)
})
// This accepts all posts requests!

router.post('/*', function (req, res) {
  console.log('params', req.params)
  var leagueID = req.params[0].split('/')[1]

  /* if (leagueID != "5414177") {
        console.log("Nice try, asshole.");
        res.send("Nice try, asshole.");
    } */

  var collection = req.params[0].split('/')
  var label = 'data'
  if (collection.length == 3) {
    collection = collection[2]
  } else if (collection.includes('week')) {
    collection = collection.slice(2, 5)
    collection = collection.join('')
    fieldName = Object.keys(req.body)[0]
    const parsedStats = statWrangler.convertStatsToArray(req.body)
    if (parsedStats) {
      saveToDb(parsedStats, collection, fieldName)
    }
  } else if (collection.includes('leagueteams')) {
    console.log('league teams')
    fieldName = Object.keys(req.body)[0]

    console.log(req.body.leagueTeamInfoList)
    saveToDb(req.body.leagueTeamInfoList, 'leagueteams', fieldName)
  } else if (collection.includes('team') && collection.length > 4) {
    collection = collection.slice(3, 4)
    label = 'roster'
    const parsedRoster = rosterWrangler.convertRosterToArray(req.body.rosterInfoList)
    const teamPositionalBreakdown = rosterWrangler.getPositionalTotals(req.body.rosterInfoList)
    saveRoster(parsedRoster)
    saveTeamPositionals(parsedRoster)
    collection = collection.join('')
  } else if (collection.includes('leagueteams')) {
  } else {
    collection = collection.slice(2, 5)
    collection = collection.join('')
  }

  res.end()
  //   remove(label, collection).then(function (response, error) {
  //     if (response == 'REMOVED') {
  //       db.collection(collection).insert({
  //         label: label,
  //         data: data
  //       })
  //       res.end()
  //     }
  //   })
})

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

function saveTeamPositionals (roster) {
  return new Promise(function (resolve, reject) {
    db.collection('teamPositionals').insertMany(roster, { ordered: false }, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve('REMOVED')
      }
    })
  })
}

function saveToDb (data, collectionName, fieldName) {
  return new Promise(function (resolve, reject) {
    db.collection(collectionName).insert({ [fieldName]: data }, function (err, doc) {
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

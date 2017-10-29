// SETUP ROUTER
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var roster = require('./../models/rosterModel')
var bodyParser = require('body-parser')
var data = require('./../data-wranglers/passingStats.json')
var calculationWrangler = require('./../data-wranglers/calculationWrangler.js')
var rosterWrangler = require('./../data-wranglers/rosterWrangler.js')
var breakdownCheck = require('./../data-wranglers/breakdownCheck.js')

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

router.get('/', async function (req, res, next) {
  try {
    const teamsBreakdowns = await getBreakdowns()
    const teamInfo = await getLeague()
    const breakdown = breakdownCheck.checkPositionalBreakdown(teamsBreakdowns)
    const breakdownWithTeamNames = breakdownCheck.addNames(breakdown, teamInfo)
    if (breakdownWithTeamNames.length === 0) {
      res.json({
        message: 'All Teams meet requirements'
      })
    } else {
      res.json(breakdownWithTeamNames)
    }
  } catch (e) {
    next(e)
  }
})
// This accepts all posts requests!

function getBreakdowns () {
  return new Promise(function (resolve, reject) {
    db.collection('teamPositionals').find({}).toArray(function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

function getLeague () {
  return new Promise(function (resolve, reject) {
    db.collection('leagueteams').find({}).toArray(function (err, doc) {
      if (err) {
        reject(err)
      } else {
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

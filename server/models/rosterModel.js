const mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID

var rosterSchema = mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  position: String
})

rosterSchema.methods.newRoster = function (data, userID) {
  var newRoster = new resourceModel({})

  newRoster.save(function (err) {
    if (err) {
      throw err
    } else {
      return 'success'
    }
  })
}

var rosterModel = mongoose.model('roster', rosterSchema, 'roster')
module.exports = rosterModel

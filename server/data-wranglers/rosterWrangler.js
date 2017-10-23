var rosterWrangler = {
  rosterArray: [],
  rosterObject: {},

  convertRosterToArray (team) {
    team.map(player => {
      if (player.position === 'QB' || player.position === 'HB' || player.position === 'WR' || player.position === 'TE') {
        this.rosterArray.push({
          _id: player.rosterId,
          firstName: player.firstName,
          lastName: player.lastName,
          position: player.position
        })
      }
    })

    return this.rosterArray
  },

  convertRosterToObject (players) {
      players.map(player => {
          // console.log(player['_id'])
          this.rosterObject[player['_id']] = {
              firstName: player.firstName,
              lastName: player.lastName,
              position: player.position,
              portraitId: player.portraitId
            }
            // console.log('-')
        })
        // this.printState()
        console.log(this.rosterObject)
    return this.rosterObject
  }
}

module.exports = rosterWrangler

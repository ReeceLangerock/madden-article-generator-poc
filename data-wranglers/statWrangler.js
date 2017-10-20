var statWrangler = {
  roster: {},
  printState: function (test) {
    // console.log(this.roster)

    Object.keys(this.roster).map(player => {
      console.log(this.roster[player])
    })
  },
  parseStats (stats) {
    stats.map(player => {
      // console.log(player['_id'])
      // console.log(player.firstName)
      this.roster[player['_id']] = {
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position
      }
      // console.log('-')
      
    })
    this.printState()
    return this.roster
  }
}

module.exports = statWrangler

var rosterWrangler = {
    roster: [],
  
    printRoster: function (test) {
      this.roster.map(player => {
        console.log(player.position)
      })
    },
    parseRoster (team) {
      team.map(player => {
        if (player.position === 'QB' || player.position === 'HB' || player.position === 'WR' || player.position === 'TE') {
          this.roster.push({
            _id: player.rosterId,
            firstName: player.firstName,
            lastName: player.lastName,
            position: player.position
          })
        }
      })
  
      return this.roster;
      // this.printRoster()
    }
  }
  
  module.exports = rosterWrangler
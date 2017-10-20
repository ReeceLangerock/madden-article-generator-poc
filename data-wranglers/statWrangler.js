var statWrangler = {
  stats: {},
  printState: function (test) {
    // console.log(this.roster)

    Object.keys(this.roster).map(player => {
      console.log(this.roster[player])
    })
  },
  convertStatsToArray (stats) {
    const statToParse = Object.keys(stats)[0]
    switch (statToParse) {
      case 'playerPassingStatInfoList':
      stats.playerPassingStatInfoList.map(player => {
        this.stats[player.rosterId] = {
          passTDs: player.passTDs,
          passInts: player.passInts,
          passYds: player.passYds
        }
      })
      
      break
      
      default:
    }
    
    // stats.map(player => {
      //   // console.log(player['_id'])
    //   // console.log(player.firstName)
    //   this.stats[player.rosterId] = {
      //     passTDs: player.passTDs,
      //     passInts: player.passInts,
      //     passYds: player.passYds
      //   }
      //   // console.log('-')
      
      // })
      // console.log(roster)
      // this.printState()
      // console.log(this.stats)
      
      console.log(this.stats)
    return this.stats
  }
}

module.exports = statWrangler

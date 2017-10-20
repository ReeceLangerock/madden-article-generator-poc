var statWrangler = {
  statsArray: [],
  statsObject: {},
  printState: function (test) {
    // console.log(this.roster)

    Object.keys(this.roster).map(player => {
      console.log(this.roster[player])
    })
  },
  convertStatsToArray (stats) {
    const statToParse = Object.keys(stats)[0]
    var data = {}
    switch (statToParse) {
      case 'playerPassingStatInfoList':
        stats.playerPassingStatInfoList.map(player => {
          data.playerPassingStatInfoList.push({
            _id: player.rosterId,
            passTDs: player.passTDs,
            passInts: player.passInts,
            passYds: player.passYds,
            teamId: player.teamId
          })
        })

        break

      case 'playerReceivingStatInfoList':
        stats.playerReceivingStatInfoList.map(player => {
          data.playerReceivingStatInfoList.push({
            _id: player.rosterId,
            recCatches: player.recCatches,
            recTDs: player.recTDs,
            recYds: player.recYds,
            teamId: player.teamId
          })
        })

        break

      case 'playerRushingStatInfoList':
        stats.playerRushingStatInfoList.map(player => {
          data.playerRushingStatInfoList.push({
            _id: player.rosterId,
            rushFum: player.rushFum,
            rushTDs: player.rushTDs,
            rushYds: player.rushYds,
            teamId: player.teamId
          })
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

    // console.log(this.stats)
    return data
  },

  convertStatsToObject (stats) {
    stats.map(player => {
      // console.log(player['_id'])
      this.statsObject[player['_id']] = {
        passTDs: player.passTDs || undefined,
        passInts: player.passInts || undefined,
        passYds: player.passYds || undefined
      }
      // console.log('-')
    })
    // this.printState()
    // console.log(this.rosterObject)
    return this.rosterObject
  }
}

module.exports = statWrangler

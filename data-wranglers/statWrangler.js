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
    switch (statToParse) {
      case 'playerPassingStatInfoList':
        playerPassingStatInfoList = []
        stats.playerPassingStatInfoList.map(player => {
          playerPassingStatInfoList.push({
            _id: player.rosterId,
            passTDs: player.passTDs,
            passInts: player.passInts,
            passYds: player.passYds,
            teamId: player.teamId
          })
        })
        return playerPassingStatInfoList
        break

      case 'playerReceivingStatInfoList':
        playerReceivingStatInfoList = []
        stats.playerReceivingStatInfoList.map(player => {
          playerReceivingStatInfoList.push({
            _id: player.rosterId,
            recCatches: player.recCatches,
            recTDs: player.recTDs,
            recYds: player.recYds,
            teamId: player.teamId
          })
        })
        return playerReceivingStatInfoList
        break

      case 'playerRushingStatInfoList':
        playerRushingStatInfoList = []
        stats.playerRushingStatInfoList.map(player => {
          playerRushingStatInfoList.push({
            _id: player.rosterId,
            rushFum: player.rushFum,
            rushTDs: player.rushTDs,
            rushYds: player.rushYds,
            teamId: player.teamId
          })
        })
        return playerRushingStatInfoList
        break

      default:
        return false
    }
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

var statWrangler = {
  stats: {},

  parseStats (roster, stats) {
    stats.playerPassingStatInfoList.map(player => {
      roster[player['_id']] = {
        ...roster[player['_id']],
        passTDs: player.passTDs,
        passInts: player.passInts,
        passYds: player.passYds
      }
    })

    stats.playerReceivingStatInfoList.map(player => {
      roster[player['_id']] = {
        ...roster[player['_id']],

        recCatches: player.recCatches,
        recTDs: player.recTDs,
        recYds: player.recYds
      }
    })

    stats.playerRushingStatInfoList.map(player => {
      roster[player['_id']] = {
        ...roster[player['_id']],

        rushFum: player.rushFum,
        rushTDs: player.rushTDs,
        rushYds: player.rushYds
      }
    })

    return roster
  },

  calculatePprScores (roster) {
    let rosterArray = []
    Object.keys(roster).map(playerKey => {
      let player = roster[playerKey]
      let passScore = (player.passTDs || 0) * 4 + (player.passInts || 0) * -2 + (player.passYds || 0) * 0.04
      let rushScore = (player.recTDs || 0) * 6 + (player.recCatches || 0) * 1 + (player.recYds || 0) * 0.1
      let recScore = (player.rushTDs || 0) * 6 + (player.rushFum || 0) * -2 + (player.rushYds || 0) * 0.1

      let totalScore = (passScore || 0) + (rushScore || 0) + (recScore || 0)

      roster[playerKey] = {
        ...roster[playerKey],

        totalScore
      }
      rosterArray.push(roster[playerKey])
    })

    rosterArray.sort((a, b) => {
      return b.totalScore - a.totalScore
    })

    const rosterTopFive = this.getTopFiveAtEachPosition(rosterArray)
    //test
    return rosterTopFive
  },


  getTopFiveAtEachPosition(roster){
    qb = roster.filter((player) => {
      return player.position === 'QB'
    })
    qb = qb.slice(0,5)

    wr = roster.filter((player) => {
      return player.position === 'WR'
    })
    wr = wr.slice(0,5)

    te = roster.filter((player) => {
      return player.position === 'TE'
    })
    te = te.slice(0,5)

    hb = roster.filter((player) => {
      return player.position === 'HB'
    })
    hb = hb.slice(0,5)

    return {
      qb,
      wr,
      te,
      hb
    }
  }
}

module.exports = statWrangler

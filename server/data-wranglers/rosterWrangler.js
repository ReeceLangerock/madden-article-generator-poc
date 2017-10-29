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
          position: player.position,
          portraitId: player.portraitId
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
  },

  getPositionalTotals (players) {
    let qbCount, wrCount, teCount, hbCount, fbCount, olCount, dlCount, lbCount, dbCount, kCount, pCount, total
    let teamId = players[0].teamId
    let positionalBreakdown = []

    team.map(player => {
      switch (player.position) {
        // Offensive Players

        case 'QB':
          qbCount++
          break
        case 'HB':
          hbCount++
          break
        case 'FB':
          fbCount++
          break
        case 'WR':
          wrCount++
          break
        case 'TE':
          teCount++
          break
        // Defensive Players
        case 'RE':
        case 'LE':
        case 'DT':
          dlCount++
          break
        case 'ROLB':
        case 'MLB':
        case 'LOLB':
          lbCount++
          break
        case 'SS':
        case 'FS':
        case 'CB':
          dbCount++
          break
        // Special Teams
        case 'K':
          kCount++
          break
        case 'P':
          pCount++
          break
      }
    })

    positionalBreakdown.push({
      _id: teamId,
      qbCount,
      wrCount,
      hbCount,
      fbCount,
      olCount,
      dlCount,
      lbCount,
      dbCount,
      pCount,
      kCount
    })
    return positionalBreakdown
  }
}

module.exports = rosterWrangler

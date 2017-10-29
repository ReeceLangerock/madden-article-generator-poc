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

  getPositionalTotals (team) {
    let qbCount = 0, wrCount = 0, teCount = 0, hbCount = 0, fbCount = 0, olCount = 0, dlCount = 0, lbCount = 0, dbCount = 0, kCount = 0, pCount = 0, total
    let teamId = team[0].teamId
    let positionalBreakdown = []

    team.map(player => {
      if (player.isOnPracticeSquad) {
        //do nothing
      } else {
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
          case 'LT':
          case 'LG':
          case 'C':
          case 'RG':
          case 'RT':
            olCount++
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
      }
    })

    positionalBreakdown.push({
      _id: teamId,
      qbCount,
      wrCount,
      hbCount,
      teCount,
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

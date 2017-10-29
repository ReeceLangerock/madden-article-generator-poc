var statWrangler = {
  statsArray: [],
  statsObject: {},
  printState: function (test) {
    // console.log(this.roster)

    Object.keys(this.roster).map(player => {
      console.log(this.roster[player])
    })
  },
  checkPositionalBreakdown (teams) {
    const breakdown = []
    teams.map(team => {
      let swingPlayers = (team.hbCount || 0) + (team.fbCount || 0) + (team.teCount || 0)
      let total = team.qbCount + swingPlayers + team.wrCount + team.olCount + team.lbCount + team.dbCount + team.dlCount + team.pCount + team.kCount

      breakdown.push({
        id: team['_id'],
        qb: team.qbCount < 2 ? 2 - team.qbCount : 0,
        hb: team.hbCount < 3 ? 3 - team.hbCount : 0,
        te: team.teCount < 3 ? 3 - team.teCount : 0,
        swing: swingPlayers < 7 ? 7 - swingPlayers : 0,
        wr: team.wrCount < 5 ? 5 - team.wrCount : 0,
        ol: team.olCount < 7 ? 7 - team.olCount : 0,

        lb: team.lbCount < 7 ? 7 - team.lbCount : 0,
        db: team.dbCount < 8 ? 8 - team.dbCount : 0,
        dl: team.dlCount < 7 ? 7 - team.dlCount : 0,
        p: team.pCount < 1 ? 1 : 0,
        k: team.kCount < 1 ? 1 : 0,
        total: total
      })
    })

    let badTeams = this.checkForBadTeams(breakdown)
    return badTeams
  },

  checkForBadTeams (teams) {
    let badTeams = []
    teams.map(pos => {
      let totalNeeded = pos.qb + pos.swing + pos.wr + pos.ol + pos.lb + pos.db + pos.dl + pos.k + pos.p
      if (totalNeeded > 0 || pos.total < 48 || pos.total > 53) {
        badTeams.push({
          ...pos
        })
      }
    })

    return badTeams
  },
  parseTeamNames (teams) {
    parsed = {}
    teams[0].leagueTeamInfoList.map(team => {
      parsed[team.teamId] = {
        name: team.displayName
      }
    })
    return parsed
  },
  addNames (breakdowns, teamInfo) {
    let parsedTeams = this.parseTeamNames(teamInfo)
    let teamsWithNames = []
    breakdowns.map(team => {
      let teamName = parsedTeams[team.id].name
      teamsWithNames.push({
        ...team,
        teamName
      })
    })
    return teamsWithNames
  }
}

module.exports = statWrangler

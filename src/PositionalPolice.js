import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from './redux/actions/actions'

const TeamName = styled.h5`
text-decoration: underline;
margin: 0;

`
const List = styled.ul`
margin-top: 0px;
`


export class PositionalPolice extends React.Component {
  componentWillMount () {
    this.props.getPositionalBreakdown()
  }

  renderTeams () {
    if (this.props.breakdowns) {
      return this.props.breakdowns.map(team => {
        return (
          <div key={team.id}>
            <TeamName>{team.teamName}</TeamName>
            <List>
              {team.qb > 0 && <li>QB Needed: {team.qb}</li>}
              {team.hb > 0 && <li>HB Needed: {team.hb}</li>}
              {team.te > 0 && <li>TE Needed: {team.te}</li>}
              {team.swing > 0 && team.hb === 0 && team.te === 0 && <li>Swing Player Needed: {team.swing}</li>}
              {team.wr > 0 && <li>WR Needed: {team.wr}</li>}
              {team.ol > 0 && <li>OL Needed: {team.ol}</li>}

              {team.lb > 0 && <li>LB Needed: {team.lb}</li>}
              {team.db > 0 && <li>DB Needed: {team.db}</li>}
              {team.dl > 0 && <li>DL Needed: {team.dl}</li>}

              {team.p > 0 && <li>P Needed: {team.p}</li>}
              {team.k > 0 && <li>K Needed: {team.k}</li>}

              {team.total < 48 && <li>Minimum {48 - team.total} players need to be added</li>}
              {team.total > 53 && <li>Minimum {team.total -53} players need to be cut</li>}
         
              

            </List>
            <br/>
          </div>
        )
      })
    }
  }
  render () {
    return <div>{this.renderTeams()}</div>
  }
}

const mapStateToProps = state => ({
  breakdowns: state.breakdownReducer.breakdowns
})
export default connect(mapStateToProps, actions)(PositionalPolice)

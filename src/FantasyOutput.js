import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from './redux/actions/actions'

const FantasyContainer = styled.div`
margin: 0 auto;
display: flex;
flex-direction: column;
width: 600px;


`

const PositionContainer = styled.div`
border-radius: 2px;
padding: 5px 10px;
background: white;
display: flex;
align-items: flex-end;
border: 1px solid`

const Table = styled.table`
font-size: 11px;
width: 500px;`

const SectionTitle = styled.div`
padding: 1px 0px 1px 5px;
background: green;
font-size: 20px;`

const Image = styled.img`
clear: both;`

export class FantasyOutput extends React.Component {
  componentWillMount () {
    this.props.getPPRScores()
  }

  renderTopPlayer () {
    return this.props.topFive.qb.map((player, index) => {
      return (
        <tr>

          <td>{index + 1}. {`${player.firstName} ${player.lastName}`}</td>
          <td>TM</td>

          <td class='sortcell'>{player.passYds}</td>
          <td>{player.passTDs}</td>
          <td>{player.passInts}</td>
          <td>{player.rushYds}</td>
          <td>{player.rushTDs}</td>
          <td>{player.rushFum}</td>
          <td>{player.totalScore.toPrecision(4)}</td>
        </tr>
      )
    })
  }

  renderReceiver (position) {
    return this.props.topFive[position].map((player, index) => {
      return (
        <tr>

          <td>{index + 1}. {`${player.firstName} ${player.lastName}`}</td>
          <td>TM</td>

          <td>{player.recCatches || 0}</td>
          <td>{player.recYds || 0}</td>
          <td>{player.recTDs || 0}</td>
          <td>{player.rushYds || 0}</td>
          <td>{player.rushTDs || 0}</td>
          <td>{player.rushFum || 0}</td>
          <td>{player.totalScore.toPrecision(4)}</td>
        </tr>
      )
    })
  }
  renderHB (position) {
    return this.props.topFive[position].map((player, index) => {
      return (
        <tr>

          <td>{index + 1}. {`${player.firstName} ${player.lastName}`}</td>
          <td>TM</td>
          <td>{player.rushYds || 0}</td>
          <td>{player.rushTDs || 0}</td>
          <td>{player.recCatches || 0}</td>
          <td>{player.recYds || 0}</td>
          <td>{player.recTDs || 0}</td>
          <td>{player.rushFum || 0}</td>

          <td>{player.totalScore.toPrecision(4)}</td>
        </tr>
      )
    })
  }
  render () {
    let topFive = this.props.topFive
    return (
      <FantasyContainer>
        <SectionTitle className='fantasy__section-title'>
          Passing Leaders
        </SectionTitle>
        <PositionContainer>
          <Image src='http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16757.png&amp;w=65&amp;h=90&amp;scale=crop&amp;background=0xcccccc&amp;transparent=false' />

          <Table>
            <tbody>

              <tr class='colhead' align='left'>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td><span title='Passing yards'>P.YDS</span></td>
                <td><span title='Passing touchdowns'>P.TD</span></td>
                <td><span title='Interceptions thrown'>INT</span></td>
                <td><span title='Passing yards'>R.YDS</span></td>
                <td><span title='Passing touchdowns'>R.TD</span></td>
                <td><span title='Fumbles lost'>FUM</span></td>
                <td><span title='Passer (QB) Rating'>PTS</span></td>
              </tr>

              {this.renderTopPlayer()}
            </tbody>
          </Table>
        </PositionContainer>

        <br />

        <SectionTitle className='fantasy__section-title'>
          <td>Top Fantasy Wide Receivers</td>
        </SectionTitle>
        <PositionContainer>
          <Image src='http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16757.png&amp;w=65&amp;h=90&amp;scale=crop&amp;background=0xcccccc&amp;transparent=false' />

          <Table>
            <tbody>

              <tr class='colhead' align='left'>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td><span title='Receiving yards'>CATCHES</span></td>
                <td><span title='Receiving yards'>REC.YDS</span></td>
                <td><span title='Passing touchdowns'>REC.TD</span></td>
                <td><span title='Passing yards'>RUSH.YDS</span></td>
                <td><span title='Passing touchdowns'>RUSH.TD</span></td>
                <td><span title='Fumbles lost'>FUM</span></td>
                <td><span title='Passer (QB) Rating'>PTS</span></td>
              </tr>

              {this.renderReceiver('wr')}
            </tbody>
          </Table>
        </PositionContainer>

        <br />

        <SectionTitle className='fantasy__section-title'>
          <td>Top Fantasy Tight Ends</td>
        </SectionTitle>
        <PositionContainer>
          <Image src='http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16757.png&amp;w=65&amp;h=90&amp;scale=crop&amp;background=0xcccccc&amp;transparent=false' />

          <Table>
            <tbody>

              <tr class='colhead' align='left'>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td><span title='Receiving yards'>CATCHES</span></td>
                <td><span title='Receiving yards'>REC.YDS</span></td>
                <td><span title='Passing touchdowns'>REC.TD</span></td>
                <td><span title='Passing yards'>RUSH.YDS</span></td>
                <td><span title='Passing touchdowns'>RUSH.TD</span></td>
                <td><span title='Fumbles lost'>FUM</span></td>
                <td><span title='Passer (QB) Rating'>PTS</span></td>
              </tr>

              {this.renderReceiver('te')}
            </tbody>
          </Table>
        </PositionContainer>

        <br />

        <SectionTitle className='fantasy__section-title'>
          <td>Top Fantasy Running Backs</td>
        </SectionTitle>
        <PositionContainer>
          <Image src='http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/16757.png&amp;w=65&amp;h=90&amp;scale=crop&amp;background=0xcccccc&amp;transparent=false' />

          <Table>
            <tbody>

              <tr class='colhead' align='left'>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td><span title='Passing yards'>RUSH.YDS</span></td>
                <td><span title='Passing touchdowns'>RUSH.TD</span></td>
                <td><span title='Receiving yards'>CATCHES</span></td>
                <td><span title='Receiving yards'>REC.YDS</span></td>
                <td><span title='Passing touchdowns'>REC.TD</span></td>

                <td><span title='Fumbles lost'>FUM</span></td>
                <td><span title='Passer (QB) Rating'>PTS</span></td>
              </tr>

              {this.renderHB('hb')}
            </tbody>
          </Table>
        </PositionContainer>

      </FantasyContainer>
    )
  }
}

const mapStateToProps = state => ({
  topFive: state.fantasyReducer.players
})
export default connect(mapStateToProps, actions)(FantasyOutput)

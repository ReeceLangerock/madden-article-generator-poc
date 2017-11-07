import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from './redux/actions/actions'

const FantasyContainer = styled.div`
margin: 0 auto;
display: flex;
flex-direction: column;
width: 715px;

table, th, td {
    
}

`

const PositionContainer = styled.div`
padding: 2px;
background: white;
display: flex;
align-items: flex-end;
border: 2px solid ${props => props.primary ? '#003399' : '#ff0000'};`

const Table = styled.table`
font-size: 14px;
width: calc(100% - 90px);
border: 1px solid black;
border-collapse: collapse;
text-align: center;
td:nth-child(1){
  text-align: left;
}
`

const SectionTitle = styled.div`
color :#ffffff;
padding: 2px 0px 2px 5px;
	background: ${props => props.primary ? '#003399' : '#ff0000'};
font-size: 20px;
font-weight: bold;


`

const Image = styled.img`
height: 90px;
margin-right:0px;`

export class FantasyOutput extends React.Component {
  componentWillMount () {
    this.props.getPPRScores()
  }

  renderTopPlayer () {
    return this.props.topFive.qb.map((player, index) => {
      return (
        <tr key = {`qbRow${index}`}>

          <td>{index + 1}. {`${player.firstName} ${player.lastName}`}</td>
          <td>TM</td>

          <td className='sortcell'>{player.passYds}</td>
          <td>{player.passTDs || 0}</td>
          <td>{player.passInts || 0}</td>
          <td>{player.rushYds || 0}</td>
          <td>{player.rushTDs || 0}</td>
          <td>{player.rushFum || 0}</td>
          <td>{player.totalScore.toPrecision(3)}</td>
        </tr>
      )
    })
  }

  renderReceiver (position) {
    return this.props.topFive[position].map((player, index) => {
      return (
        <tr key = {`${position}Row${index}`}>
        

          <td>{index + 1}. {`${player.firstName} ${player.lastName}`}</td>
          <td>TM</td>

          <td>{player.recCatches || 0}</td>
          <td>{player.recYds || 0}</td>
          <td>{player.recTDs || 0}</td>
          <td>{player.rushYds || 0}</td>
          <td>{player.rushTDs || 0}</td>
          <td>{player.rushFum || 0}</td>
          <td>{player.totalScore.toPrecision(3)}</td>
        </tr>
      )
    })
  }
  renderHB (position) {
    return this.props.topFive[position].map((player, index) => {
      return (
        <tr key = {`hbRow${index}`}>


          <td>{index + 1}. {`${player.firstName} ${player.lastName}`}</td>
          <td>TM</td>
          <td>{player.rushYds || 0}</td>
          <td>{player.rushTDs || 0}</td>
          <td>{player.recCatches || 0}</td>
          <td>{player.recYds || 0}</td>
          <td>{player.recTDs || 0}</td>
          <td>{player.rushFum || 0}</td>

          <td>{player.totalScore.toPrecision(3)}</td>
        </tr>
      )
    })
  }
  render () {
    let topFive = this.props.topFive
    //get placeholder image
    let qbImage, hbImage, wrImage, teImage;
    if(topFive.qb[0]){
    qbImage = `http://daddyleagues.com/img/m18/players/large/${topFive.qb['0'].portraitId}.png` || '';
    }
    if(this.props.topFive.wr[0]){
    wrImage = `http://daddyleagues.com/img/m18/players/large/${topFive.wr['0'].portraitId}.png` || '';
    }
  if(this.props.topFive.te[0]){
    teImage = `http://daddyleagues.com/img/m18/players/large/${topFive.te['0'].portraitId}.png` || '';
    }
  if(this.props.topFive.hb[0]){
    hbImage = `http://daddyleagues.com/img/m18/players/large/${topFive.hb['0'].portraitId}.png` || '';
    }
    return (
      <FantasyContainer>
        <SectionTitle primary className='fantasy__section-title'>
          Passing Leaders
        </SectionTitle>
        <PositionContainer primary className ='fantasy__position-container'>
          
          <Image onError={'http://daddyleagues.com/img/m18/players/large/0.png'} className = "fantasy__image" src={qbImage} />

          <Table className = 'fantasy__table'>
            <tbody>
{/* 
               <tr className='colhead' align='left'>
                <td colSpan ={2}></td>
                <td colSpan ={3}><span title='Passing yards'>Passing</span></td>
                <td colSpan ={3}><span title='Passing yards'>Rushing</span></td>
              </tr> */}
              <tr className='colhead' align='left'>
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

        <SectionTitle className='fantasy__section-title-secondary'>
          Top Fantasy Wide Receivers
        </SectionTitle>
        <PositionContainer className ='fantasy__position-container-secondary'>
          <Image  onError={'http://daddyleagues.com/img/m18/players/large/0.png'} className = "fantasy__image" src={wrImage} />

          <Table className = 'fantasy__table'>
            <tbody>

              <tr className='colhead' align='left'>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td><span title='Receiving yards'>REC</span></td>
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

        <SectionTitle primary className='fantasy__section-title'>
          Top Fantasy Tight Ends
        </SectionTitle>
        <PositionContainer primary className ='fantasy__position-container'>
          <Image  onError={'http://daddyleagues.com/img/m18/players/large/0.png'} className = "fantasy__image" src={teImage} />

          <Table className = 'fantasy__table'>
            <tbody>
                                                                                                                                                                              
              <tr className='colhead' align='left'>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td><span title='Receiving yards'>REC</span></td>
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

        <SectionTitle className='fantasy__section-title-secondary'>
          Top Fantasy Running Backs
        </SectionTitle>
        <PositionContainer className ='fantasy__position-container-secondary'>
          <Image  onError={'http://daddyleagues.com/img/m18/players/large/0.png'} className = "fantasy__image" src={hbImage} />

          <Table className = 'fantasy__table'>
            <tbody>

              <tr className='colhead' align='left'>
                <td>PLAYER</td>
                <td>TEAM</td>
                <td><span title='Passing yards'>RUSH.YDS</span></td>
                <td><span title='Passing touchdowns'>RUSH.TD</span></td>
                <td><span title='Receiving yards'>REC</span></td>
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

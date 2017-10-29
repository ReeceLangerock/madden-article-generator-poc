import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

// import Header from './components/header/Header'
import FantasyOutput from './FantasyOutput'
import PositionalPolice from './PositionalPolice'


// import Footer from './components/Footer'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './redux/store/store'

class App extends React.Component {
  
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Container onKeyDown={this.handleKeyDown} tabIndex='0'>
            <Page>

              {/* <Header /> */}
              <main>
                <Switch>
                  <Route exact path='/fantasy' component={FantasyOutput} />
                  {/* <Route exact path='/police' component={PositionalPolice} /> */}

                  {/* <Route path="*" component={Footer} /> */}
                </Switch>
              </main>
              {/* <Footer /> */}
            </Page>
          </Container>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App

const Page = styled.div`
width: 1024px;
background:white;
display: flex;
flex-direction: column;
justify-content: space-between;
max-width: 100vw;
margin: 0 auto;
min-height: 100vh;
position: relative;
`

const Container = styled.div`
  overflow: hidden;
  max-width: 100vw;
  background:lightgrey;

`

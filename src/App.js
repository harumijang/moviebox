import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import CityFinder from './components/CityFinder'
import CityView from './components/CityView'

const CityViewRouted = withRouter(CityView);
const CityFinderRouted = withRouter(CityFinder);

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
      <img className='logo' src={require('./logo.png')} alt='moviebox logo'/>
      <div className="App">
        <Router>
          <div className={'moviebox-page--wrapper'}>
            <Route path="/"/>
            <Route exact path="/" component={CityFinderRouted}/>
            <Route exact path="/city/:gid" component={CityViewRouted}/>
          </div>
        </Router>
      </div>
      </div>
    );
  }
}

export default App;
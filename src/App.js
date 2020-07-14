import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import CityFinder from './components/CityFinder'
import CityView from './components/CityView'
// import SetImplicitToken from './actions/SetImplicitToken'

// const SetImplicitTokenRouted = withRouter(SetImplicitToken);
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
      <div className="App">
        <Router>
          <div className={'moviebox-page--wrapper'}>
            {/* <Route path="/user/login/settoken" component={SetImplicitTokenRouted}/> */}
            <Route exact path="/" component={CityFinderRouted}/>
            <Route exact path="/city/:gid" component={CityViewRouted}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
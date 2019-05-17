import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fetchStation } from './store/stationActions';
import posed, { PoseGroup } from 'react-pose';

import TopNav from './components/nav/TopNav';
import Main from './components/main/Main';
import StationDashboard from './components/sl-dashboard/StationDashboard';
import './App.scss';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 200, beforeChildren: true },
  exit: { opacity: 0 }
});

class App extends Component {
  state = {
    name: 'insomniabox',
  };

  componentDidMount() {
    this.props.dispatch(fetchStation(9291, 'Northbound', 'Axelsberg', [1,2]));
    this.props.dispatch(fetchStation(9262, 'Northbound', 'Hägerstensåsen', [1,2]));
    this.props.dispatch(fetchStation(9290, 'Southbound', 'Mälarhöjden', [2,1]));
    this.props.dispatch(fetchStation(9261, 'Southbound', 'Västertorp', [2,1]));
  }

  render() {
      return (
        <div>
          <TopNav />
          <main role="main" className="container-fluid">
            <PoseGroup>
              <RouteContainer key="mainContainer">
                <Switch location={location}>
                  <Route exact path="/" component={Main} />
                  <Route path="/about" component={About} />
                  <Route path="/stations/:direction" component={StationDashboard} />
                </Switch>
              </RouteContainer>
            </PoseGroup>
          </main>
        </div>)};
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export default connect()(App);

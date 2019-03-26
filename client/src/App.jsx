import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fetchStation } from './store/stationActions';
import posed, { PoseGroup } from 'react-pose';

import TopNav from './components/nav/TopNav';
import StationDashboard from './components/sl-dashboard/StationDashboard';
import './App.scss';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

class App extends Component {
  state = {
    name: 'insomniabox',
  };

  componentDidMount() {
    this.props.dispatch(fetchStation(9291, 'Axelsberg', [1]));
    this.props.dispatch(fetchStation(9262, 'Hägerstensåsen', [1]));
    this.props.dispatch(fetchStation(9290, 'Mälarhöjden', [2]));
    this.props.dispatch(fetchStation(9261, 'Västertorp', [2]));
  }

  render() {
    return (<Route render={({ location }) =>
      (
        <div>
          <TopNav />
          <main role="main" className="container-fluid">
            <PoseGroup>
              <RouteContainer key={location.key}>
                <Switch location={location}>
                  <Route exact path="/" component={About} key="about" />
                  <Route path="/stations" component={StationDashboard} key="stations" />
                </Switch>
              </RouteContainer>
            </PoseGroup>
          </main>
        </div>)} />);
  }
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export default connect()(App);

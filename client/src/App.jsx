import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition';
import { fetchStation } from './store/stationActions';

import TopNav from './components/nav/TopNav';
import StationDashboard from './components/sl-dashboard/StationDashboard';
import './App.scss';

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
    return (
      <Router>
        <div>
          <TopNav />
          <main role="main" className="container-fluid">
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}>
              <Route path="/stations" component={StationDashboard}/>
            </AnimatedSwitch>
          </main>
        </div>
      </Router>
    );
  }
}

export default connect()(App);

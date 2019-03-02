import { Component } from 'react';
import TopNav from './components/nav/TopNav';
import MainDashboard from './components/sl-dashboard/MainDashboard';
import './App.css';

export default class App extends Component {
  state = {
    name: 'insomniabox',
  };

  render() {
    return (
      <div>
        <TopNav />
        <main role="main" className="container">
          <div className="row">
            <div className="col-12">
              <div className="App">
                <h1>Welcome to {this.state.name}</h1>
              </div>
            </div>
          </div>
        </main>
        <div className="container">
          <MainDashboard />
        </div>
      </div>
    );
  }
}

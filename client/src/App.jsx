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
          <MainDashboard />
        </main>
      </div>
    );
  }
}

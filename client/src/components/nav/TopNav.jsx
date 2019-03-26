import { Component } from 'react';

export default class TopNav extends Component {
  state = {

  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/">Insomniabox</a>
      </nav>
    );
  }
}

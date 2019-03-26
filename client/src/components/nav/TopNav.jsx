import { Component } from 'react';
import { Link } from 'react-router-dom'

export default class TopNav extends Component {
  state = {

  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">Insomniabox</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/stations">Stations</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

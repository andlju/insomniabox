import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import posed from 'react-pose';

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const StationButton = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)'
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
  }
});

class Main extends Component {

    render() {
      const { error, loading, nextNorthbound, nextSouthbound } = this.props;
  
      if (error) {
        return <div>Error! {error.message}</div>;
      }

      return (
            <div className="card-deck">
                <StationButton className="card mb-4">
                    <Link to="/stations/northbound">
                        <div className="card-header text-center">
                            <h3>Norrut</h3>
                        </div>
                        <div className="card-body">
                            <NextDestination direction={nextNorthbound}/>
                        </div>
                    </Link>
                </StationButton>
                <StationButton className="card mb-4">
                    <Link to="/stations/southbound">
                        <div className="card-header text-center">
                            <h3>Söderut</h3>
                        </div>
                        <div className="card-body">
                          <NextDestination direction={nextSouthbound}/>
                        </div>
                    </Link>
                </StationButton>
            </div>
      );
    }
  }
  
  const mapStateToProps = state => {
    return { 
        loading: state.stations.loading > 0,
        nextSouthbound: getNextForDirection(state.stations, 'Southbound'),
        nextNorthbound: getNextForDirection(state.stations, 'Northbound'),
    };
  }
  
  function getNextForDirection(stations, direction) {
    const firstMetros = stations.Stations.filter(station => station.GroupName.toUpperCase() === direction.toUpperCase() && station.Metros.length > 0).map(station => station.Metros[0]);

    return firstMetros;
  }

  class NextDestination extends Component {
    render() {
      const {direction} = this.props;

      return (
        <table className="table table-sm table-striped table-borderless">
        <tbody>
          {direction.map(metro => <tr key={metro.JourneyNumber}><td>{metro.StopAreaName}</td><td>{metro.Destination}</td><td>{metro.DisplayTime}</td></tr>)}
        </tbody>
        </table>);
        }
  }

  export default connect(mapStateToProps)(Main);
  
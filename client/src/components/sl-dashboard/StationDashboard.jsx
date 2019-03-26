import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStation } from '../../store/stationActions';
import StationInfo from './StationInfo';

class StationDashboard extends Component {

  render() {
    const { error, loading, stations } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <div className="card-deck">
      {stations.map(station => 
          <StationInfo key={station.StationId} stationId={station.StationId} />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations.Stations,
    loading: state.stations.loading > 0,
  };
}

export default connect(mapStateToProps)(StationDashboard);

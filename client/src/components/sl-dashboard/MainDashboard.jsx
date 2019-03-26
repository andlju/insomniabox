import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStation } from '../../store/stationActions';
import StationInfo from './StationInfo';

class MainDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchStation(9291, 'Axelsberg', [1]));
    this.props.dispatch(fetchStation(9262, 'Hägerstensåsen', [1]));
    this.props.dispatch(fetchStation(9290, 'Mälarhöjden', [2]));
    this.props.dispatch(fetchStation(9261, 'Västertorp', [2]));
  }

  render() {
    const { error, loading, stations } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <div className="card-group">
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

export default connect(mapStateToProps)(MainDashboard);

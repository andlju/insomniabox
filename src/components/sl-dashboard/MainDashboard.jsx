import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStation } from '../../store/stationActions';

class MainDashboard extends Component {
  componentDidMount() {
    console.log("Mounting component");
    this.props.dispatch(fetchStation(9121));
    this.props.dispatch(fetchStation(9221));
  }

  render() {
    const { error, loading, stations } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="card-group">
          {stations.map(station => (
            <div className="card" key={station.StationId}>
              <div className="card-body">{station.StationId}</div>
            </div>
          ))}
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

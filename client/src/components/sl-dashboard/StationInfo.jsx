import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStation } from '../../store/stationActions';

class StationInfo extends Component {
  render() {
    const { error, loading, station } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if(loading) {
      return (
          <div className="card-body">
            <h5 className="card-title">Loading</h5>
          </div>)
    }

    return (
        <div className="card-body">
          <h5 className="card-title">{station.StationName}</h5>
          <table className="table table-sm table-striped table-borderless">
            <tbody>
            {
              station.Metros.map(metro => 
                <tr key={metro.JourneyNumber}>
                  <td>{metro.DisplayTime}</td><td>{metro.Destination}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  const stationId = ownProps.stationId;
  const station = state.stations.Stations.find(station => station.StationId === stationId);
  return {
    station: station,
    loading: station.loading,
  };
}

export default connect(mapStateToProps)(StationInfo);

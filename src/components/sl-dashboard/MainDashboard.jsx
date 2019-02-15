import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStation } from '../../store/stationActions';

class MainDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchStation());
  }

  render() {
    const { error, loading, lines } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
          {lines.map(line => (
            <li key={line.id}>{line.name}</li>
          ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  lines: state.station.lines,
  loading: state.station.loading,
  error: state.station.error
});

export default connect(mapStateToProps)(MainDashboard);

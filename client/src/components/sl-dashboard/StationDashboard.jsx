import { Component } from 'react';
import { connect } from 'react-redux';
import StationInfo from './StationInfo';
import posed from 'react-pose';

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const Child = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

class StationDashboard extends Component {
  
  constructor({match}) {
    super();
    this.direction = match.params.direction.toUpperCase();
  }

  render() {
    const { error, loading, stations } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <Container>
        <div className="card-deck">
          {stations.filter(station => station.GroupName.toUpperCase() === this.direction).map(station =>
              <Child key={station.StationId} className="card" >
                  <StationInfo stationId={station.StationId}/>
              </Child>)}
        </div>
      </Container>
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

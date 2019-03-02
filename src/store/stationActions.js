export const FETCH_STATION_BEGIN = 'FETCH_STATION_BEGIN';
export const FETCH_STATION_SUCCESS = 'FETCH_STATION_SUCCESS';
export const FETCH_STATION_FAILURE = 'FETCH_STATION_FAILURE';

export const fetchStationBegin = (stationId) => ({
  type: FETCH_STATION_BEGIN,
  payload: { StationId: stationId },
});

export const fetchStationSuccess = (stationId, station) => ({
    type: FETCH_STATION_SUCCESS,
    payload: { StationId: stationId, Station: station },
  });

export const fetchStationFailure = (stationId, error) => ({
  type: FETCH_STATION_FAILURE,
  payload: { StationId: stationId, error },
});

function getStation(stationId){
  return fetch('/api/tube/stations/'+stationId);
}

function fakeGetStation(stationId) {
  return new Promise((resolve) => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve({
          Station: {
            StationId: stationId,
            Metros: [
              {
                LineNumber: 13,
                Destination: 'Ropsten',
                DisplayTime: '6 min',
              },
              {
                LineNumber: 13,
                Destination: 'Norsborg',
                DisplayTime: '5 min',
              },
              {
                LineNumber: 13,
                Destination: 'Ropsten',
                DisplayTime: '12 min',
              },
              {
                LineNumber: 13,
                Destination: 'Alby',
                DisplayTime: '15 min',
              },
            ],
          }
        }),
      1000,
    );
  });
}

export function fetchStation(stationId) {
  return (dispatch) => {
    dispatch(fetchStationBegin(stationId));
    return getStation(stationId)
      .then((json) => {
        dispatch(fetchStationSuccess(stationId, json.Station));
        return json.Station;
      })
      .catch(error =>
        dispatch(fetchStationFailure(stationId, error))
      );
  };
}

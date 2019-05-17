export const FETCH_STATION_BEGIN = 'FETCH_STATION_BEGIN';
export const FETCH_STATION_SUCCESS = 'FETCH_STATION_SUCCESS';
export const FETCH_STATION_FAILURE = 'FETCH_STATION_FAILURE';

export const fetchStationBegin = (stationId, groupName) => ({
  type: FETCH_STATION_BEGIN,
  payload: { StationId: stationId, GroupName: groupName },
});

export const fetchStationSuccess = (stationId, station) => ({
  type: FETCH_STATION_SUCCESS,
  payload: { StationId: stationId, Station: station },
});

export const fetchStationFailure = (stationId, error) => ({
  type: FETCH_STATION_FAILURE,
  payload: { StationId: stationId, error },
});

const API_BASE_URL = process.env.API_BASE_URL;
const USE_FAKE = process.env.USE_FAKE;

function getStation(stationId, directions) {
  if (USE_FAKE) {
    return fakeGetStation(stationId, directions);    
  }
  return fetch(API_BASE_URL + '/tube/stations/' + stationId + "/realtime").then(resp => resp.json());
}

function fakeGetStation(stationId, directions) {
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
                StopAreaName: 'Axelsberg',
                DisplayTime: '6 min',
                JourneyNumber: stationId + 1,
                JourneyDirection: 1,
              },
              {
                LineNumber: 13,
                Destination: 'Norsborg',
                StopAreaName: 'Axelsberg',
                DisplayTime: '5 min',
                JourneyNumber: stationId + 2,
                JourneyDirection: 2,
              },
              {
                LineNumber: 13,
                Destination: 'Ropsten',
                StopAreaName: 'Axelsberg',
                DisplayTime: '12 min',
                JourneyNumber: stationId + 3,
                JourneyDirection: 1,
              },
              {
                LineNumber: 13,
                Destination: 'Alby',
                StopAreaName: 'Axelsberg',
                DisplayTime: '15 min',
                JourneyNumber: stationId + 4,
                JourneyDirection: 2,
              },
            ],
          }
        }),
      Math.random() * 2000,
    );
  });
}

export function fetchStation(stationId, groupName, stationName, directions) {
  return (dispatch) => {
    // Set initial state
    dispatch(fetchStationBegin(stationId, groupName));
    // Kick off the backend call
    return getStation(stationId, directions)
      .then((json) => {
        json.Station.StationId = stationId;
        json.Station.StationName = stationName;
        json.Station.Metros = directions.map(d => json.Station.Metros.filter(m => m.JourneyDirection === d)).flat();
                
        dispatch(fetchStationSuccess(stationId, json.Station));
        return json;
      })
      .catch(error =>
        dispatch(fetchStationFailure(stationId, error))
      );
  };
}

import { FETCH_STATION_BEGIN, FETCH_STATION_SUCCESS, FETCH_STATION_FAILURE } from './stationActionTypes';

function fetchStationBegin(stationId, name) {
    return {
        type: FETCH_STATION_BEGIN,
        StationId: stationId,
        StationName: name
    }
}

function fetchStationSuccess(stationId, metros) {
    return { 
        type: FETCH_STATION_SUCCESS,
        StationId: stationId,
        Metros: metros
    };
}

function fetchStationFailure(stationId, error) {
    return { 
        type: FETCH_STATION_FAILURE,
        StationId: stationId,
        Error: error
    };
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const USE_FAKE = process.env.REACT_APP_USE_FAKE === 'true';

function getStation(stationId) {
  if (USE_FAKE) {
    return fakeGetStation(stationId);    
  }
  return fetch(API_BASE_URL + '/tube/stations/' + stationId + "/realtime").then(resp => resp.json());
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
                  Deviations: [{Text: "Inställd", Consequence: "CANCELLED", ImportanceLevel: 0}]
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
  

export function fetchStation(stationId, stationName) {
    return (dispatch) => {
      // Set initial state
      dispatch(fetchStationBegin(stationId, stationName));
      // Kick off the backend call
      return getStation(stationId)
        .then((json) => {
            const metros = json.Station.Metros;
            dispatch(fetchStationSuccess(stationId, metros));
          return json;
        })
        .catch(error =>
          dispatch(fetchStationFailure(stationId, error))
        );
    };
  }
  
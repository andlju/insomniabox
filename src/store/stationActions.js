export const FETCH_STATION_BEGIN = 'FETCH_STATION_BEGIN';
export const FETCH_STATION_SUCCESS = 'FETCH_STATION_SUCCESS';
export const FETCH_STATION_FAILURE = 'FETCH_STATION_FAILURE';

export const fetchStationBegin = () => ({
  type: FETCH_STATION_BEGIN,
});

export const fetchStationSuccess = station => ({
    type: FETCH_STATION_SUCCESS,
    payload: { station },
  });

export const fetchStationFailure = error => ({
  type: FETCH_STATION_FAILURE,
  payload: { error },
});

function fakeGetStation() {
  return new Promise((resolve) => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve({
          station: {
            lines: [
              {
                id: 0,
                name: 'Röda linjen mot Ropsten',
              },
              {
                id: 1,
                name: 'Röda linjen mot Norsborg',
              },
              {
                id: 2,
                name: 'Röda linjen mot Fruängen',
              },
              {
                id: 3,
                name: 'Röda linjen mot Mörby Centrum',
              },
            ],
          }
        }),
      1000,
    );
  });
}

export function fetchStation() {
  return (dispatch) => {
    dispatch(fetchStationBegin());
    return fakeGetStation()
      .then((json) => {
        console.log(json.station);
        dispatch(fetchStationSuccess(json.station));
        return json.station;
      })
      .catch(error =>
        dispatch(fetchStationFailure(error))
      );
  };
}

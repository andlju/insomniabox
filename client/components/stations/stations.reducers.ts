import { StationsState } from './stations.model';
import { StationAction, LOAD_STATIONS, LOAD_STATIONS_SUCCESS } from './stations.actions';

const initialState: StationsState = {
  loading: false,
  stations: []
};

export function stationsReducer(
  state = initialState,
  action: StationAction
): StationsState {
  switch (action.type) {
    case LOAD_STATIONS:
      return {
        loading: true,
        stations: []
      };
    case LOAD_STATIONS_SUCCESS:
      return {
        loading: false,
        stations: action.payload
      };
    default:
      return state;
  }
}

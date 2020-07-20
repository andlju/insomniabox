import { StationsState } from './stations.model';
import moment from "moment";
import { StationsAction, LOAD_STATIONS, LOAD_STATIONS_SUCCESS, LOAD_REALTIME_INFO_SUCCESS, LOAD_REALTIME_INFO } from './stations.actions';

const initialState: StationsState = {
  loading: false,
  stations: []
};

export function stationsReducer(
  state = initialState,
  action: StationsAction
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
        stations: action.payload.stations
      };
      case LOAD_REALTIME_INFO:
        return {
          ...state,
          stations: state.stations.map(station => station.siteId === action.payload.siteId ? {
            ...station,
            realtimeInfo: {
              ...station.realtimeInfo,
              loading: true
            }
          } : station)
          };
    case LOAD_REALTIME_INFO_SUCCESS:
      return {
        ...state,
        stations: state.stations.map(station => station.siteId === action.payload.siteId ? {
          ...station,
          realtimeInfo: {
            ...action.payload.realtimeInfo,
            loading: false,
            journeys: action.payload.realtimeInfo?.journeys?.filter(j => j.directionId === station.defaultDirectionId),
            preferred: action.payload.realtimeInfo?.journeys?.find(j =>
              j.directionId === station.defaultDirectionId &&
              moment(j.expectedDateTime).isAfter(moment().add(station.minuteMargin, "minutes"))
            )
          }
        } : station)
      }
    default:
      return state;
  }
}

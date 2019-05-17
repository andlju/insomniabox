import {
  FETCH_STATION_BEGIN,
  FETCH_STATION_SUCCESS,
  FETCH_STATION_FAILURE,
} from '../stationActions';

const initialState = {
  Stations: [],
  loading: 0, // Number of stations currently loading
};

export default function stationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATION_BEGIN:

      const newStation = {
        Metros: [],
        StationId: action.payload.StationId,
        GroupName: action.payload.GroupName,
        loading: true,
        error: null
      };

      return {
        ...state,
        Stations: [...state.Stations, newStation],
        loading: state.loading + 1,
      };

    case FETCH_STATION_SUCCESS:

      return {
        ...state,
        Stations: state.Stations.map((item, index) => 
          {
            if (item.StationId !== action.payload.StationId) {
              return item;
            }
            return {
              ...item,
              ...action.payload.Station,
              loading: false,
              error: null
            }
          }),
          loading: state.loading - 1,
      };

    case FETCH_STATION_FAILURE:

      return {
        ...state,
        Stations: state.Stations.map((item, index) => 
          {
            if (item.StationId !== action.payload.StationId) {
              return item;
            }
            return {
                ...item,
                Metros: [],
                loading: false,
                error: action.payload.error,
            }
          }),
          loading: state.loading - 1
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

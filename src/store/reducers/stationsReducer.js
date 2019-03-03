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
      console.log("Fetch station begin", action.payload.StationId);

      const newStation = {
        Metros: [],
        StationId: action.payload.StationId,
        loading: true,
        error: null
      };

      return {
        ...state,
        Stations: [...state.Stations, newStation],
        loading: state.loading + 1,
      };

    case FETCH_STATION_SUCCESS:
      console.log("Fetch station success", action.payload.StationId);

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
      console.log("Fetch station failure", action.payload.StationId, action.payload.error);

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

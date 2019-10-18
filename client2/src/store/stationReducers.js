import { FETCH_STATION_BEGIN, FETCH_STATION_SUCCESS, FETCH_STATION_FAILURE } from './stationActionTypes';

const initialState = [
    {
        "Name": "Hägerstensåsen",
        "StationId": 9262,
        "Metros": [
        ]
    },
    {
        "Name": "Axelsberg",
        "StationId": 9291,
        "Metros": [
        ]
    },
    {
        "Name": "Västertorp",
        "StationId": 9261,
        "Metros": [
        ]
    },
    {
        "Name": "Mälarhöjden",
        "StationId": 9290,
        "Metros": [
        ]
    }
];

function stations(state = initialState, action) {
    switch (action.type) {
        case FETCH_STATION_BEGIN:
            return state.map((station, idx) => {
                if (station.StationId === action.StationId) {
                    return {
                        ...station,
                        Loading: true
                    }
                }
                return station;
            });
        case FETCH_STATION_SUCCESS:
            return state.map((station, idx) => {
                if (station.StationId === action.StationId) {
                    return {
                        ...station, Loading: false, Metros: action.Metros
                    }
                }
                return station;
            });
        case FETCH_STATION_FAILURE:
            return state.map((station, idx) => {
                if (station.StationId === action.StationId) {
                    return {
                        ...station, Loading: false, Failed: true, Error: action.Error
                    }
                }
                return station;
            });
        default:
            return state;
    }
}

export default stations;

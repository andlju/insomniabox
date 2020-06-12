import { StationModel, StationsState } from "./stations.model";

export const START_LOADING_STATIONS = 'START_LOADING_STATIONS';
export const STOP_LOADING_STATIONS = 'STOP_LOADING_STATIONS';
export const LOAD_STATIONS = 'LOAD_STATIONS';
export const LOAD_STATIONS_SUCCESS = 'LOAD_STATIONS_SUCCESS';

export interface StartLoadingStationsAction {
  type: typeof START_LOADING_STATIONS
};

export interface StopLoadingStationsAction {
  type: typeof STOP_LOADING_STATIONS
};

export interface LoadStationsAction {
  type: typeof LOAD_STATIONS,
  payload: {
    isServer: boolean
  }
};

export interface LoadStationsSuccessAction {
  type: typeof LOAD_STATIONS_SUCCESS,
  payload: StationModel[]
};

export type StationsAction = LoadStationsAction | LoadStationsSuccessAction | StartLoadingStationsAction | StopLoadingStationsAction;

export function startLoadingStations(): StationsAction {
  return {
    type: START_LOADING_STATIONS
  }
};

export function stopLoadingStations(): StationsAction {
  return {
    type: STOP_LOADING_STATIONS
  }
};

export function loadStations(isServer: boolean) : StationsAction {
  return {
    type: LOAD_STATIONS,
    payload: {
      isServer: isServer
    }
  };
};

export function loadStationsSuccess(stations: StationModel[]) : StationsAction {
  return {
    type: LOAD_STATIONS_SUCCESS,
    payload: stations
  };
};

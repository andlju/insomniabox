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
  type: typeof LOAD_STATIONS
};

export interface LoadStationsSuccessAction {
  type: typeof LOAD_STATIONS_SUCCESS,
  payload: StationModel[]
};

export type StationAction = LoadStationsAction | LoadStationsSuccessAction | StartLoadingStationsAction | StopLoadingStationsAction;

export function startLoadingStations(): StationAction {
  return {
    type: START_LOADING_STATIONS
  }
};

export function stopLoadingStations(): StationAction {
  return {
    type: STOP_LOADING_STATIONS
  }
};

export function loadStations() : StationAction {
  return {
    type: LOAD_STATIONS
  };
};

export function loadStationsSuccess(stations: StationModel[]) : StationAction {
  return {
    type: LOAD_STATIONS_SUCCESS,
    payload: stations
  };
};

import { StationModel, StationsState, RealtimeInfoModel } from "./stations.model";

export const START_LOADING_REALTIME = 'START_LOADING_REALTIME';
export const STOP_LOADING_REALTIME = 'STOP_LOADING_REALTIME';
export const LOAD_STATIONS = 'LOAD_STATIONS';
export const LOAD_STATIONS_SUCCESS = 'LOAD_STATIONS_SUCCESS';

export const LOAD_REALTIME_INFO = 'LOAD_REALTIME_INFO';
export const LOAD_REALTIME_INFO_SUCCESS = 'LOAD_REALTIME_INFO_SUCCESS';

export interface StartLoadingRealtimeAction {
  type: typeof START_LOADING_REALTIME
};

export interface StopLoadingRealtimeAction {
  type: typeof STOP_LOADING_REALTIME
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

export interface LoadRealtimeInfoAction {
  type: typeof LOAD_REALTIME_INFO,
  payload: {
    isServer: boolean,
    stationId: string
  }
};

export interface LoadRealtimeInfoSuccessAction {
  type: typeof LOAD_REALTIME_INFO_SUCCESS,
  payload: {
    stationId: string
    realtimeInfo: RealtimeInfoModel
  }
};

export type StationsAction = LoadStationsAction | LoadStationsSuccessAction | StartLoadingRealtimeAction | StopLoadingRealtimeAction | LoadRealtimeInfoAction | LoadRealtimeInfoSuccessAction;

export function startLoadingStations(): StationsAction {
  return {
    type: START_LOADING_REALTIME
  }
};

export function stopLoadingStations(): StationsAction {
  return {
    type: STOP_LOADING_REALTIME
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

export function loadRealtimeInfo(isServer: boolean, stationId: string) : StationsAction {
  return {
    type: LOAD_REALTIME_INFO,
    payload: {
      isServer: isServer,
      stationId: stationId
    }
  };
};

export function loadRealtimeInfoSuccess(stationId: string, realtimeInfo: RealtimeInfoModel) : StationsAction {
  return {
    type: LOAD_REALTIME_INFO_SUCCESS,
    payload: {
      stationId: stationId,
      realtimeInfo: realtimeInfo
    }
  };
};

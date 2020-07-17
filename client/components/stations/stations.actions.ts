import { StationModel, StationsState, RealtimeInfoModel } from "./stations.model";

export const START_LOADING_REALTIME = 'START_LOADING_REALTIME';
export const STOP_LOADING_REALTIME = 'STOP_LOADING_REALTIME';
export const REFRESH_REALTIME = 'REFRESH_REALTIME';

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

export interface RefreshRealtimeAction {
  type: typeof REFRESH_REALTIME
};

export interface LoadStationsAction {
  type: typeof LOAD_STATIONS,
  payload: {
    isServer: boolean
  }
};

export interface LoadStationsSuccessAction {
  type: typeof LOAD_STATIONS_SUCCESS,
  payload: {
    isServer: boolean,
    stations: StationModel[]
  }
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

export type StationsAction = LoadStationsAction | LoadStationsSuccessAction | StartLoadingRealtimeAction | StopLoadingRealtimeAction | RefreshRealtimeAction | LoadRealtimeInfoAction | LoadRealtimeInfoSuccessAction;

export function startLoadingRealtime(): StartLoadingRealtimeAction {
  return {
    type: START_LOADING_REALTIME
  }
};

export function stopLoadingRealtime(): StopLoadingRealtimeAction {
  return {
    type: STOP_LOADING_REALTIME
  }
};

export function refreshRealtime(): RefreshRealtimeAction {
  return {
    type: REFRESH_REALTIME
  }
};

export function loadStations(isServer: boolean) : LoadStationsAction {
  return {
    type: LOAD_STATIONS,
    payload: {
      isServer: isServer
    }
  };
};

export function loadStationsSuccess(isServer: boolean, stations: StationModel[]) : LoadStationsSuccessAction {
  return {
    type: LOAD_STATIONS_SUCCESS,
    payload: {
      isServer,
      stations,
    }
  };
};

export function loadRealtimeInfo(isServer: boolean, stationId: string) : LoadRealtimeInfoAction {
  return {
    type: LOAD_REALTIME_INFO,
    payload: {
      isServer: isServer,
      stationId: stationId
    }
  };
};

export function loadRealtimeInfoSuccess(stationId: string, realtimeInfo: RealtimeInfoModel) : LoadRealtimeInfoSuccessAction {
  return {
    type: LOAD_REALTIME_INFO_SUCCESS,
    payload: {
      stationId: stationId,
      realtimeInfo: realtimeInfo
    }
  };
};

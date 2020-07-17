import { ofType, combineEpics, Epic } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import { map, mergeMap, tap, takeUntil, filter, withLatestFrom } from 'rxjs/operators';
import { LOAD_STATIONS, loadStationsSuccess, START_LOADING_REALTIME, STOP_LOADING_REALTIME, loadStations, LoadStationsAction, StationsAction, loadRealtimeInfo, LOAD_REALTIME_INFO, loadRealtimeInfoSuccess, StartLoadingRealtimeAction, LOAD_STATIONS_SUCCESS, LoadStationsSuccessAction, RefreshRealtimeAction, REFRESH_REALTIME } from './stations.actions';
import { interval, Observable, of, from } from 'rxjs';
import { getStationsApi, getRealtimeApi } from '../../services/station.service';
import { StationModel } from './stations.model';
import { getAllStationIds } from './stations.selectors';
import { Action } from 'rxjs/internal/scheduler/Action';
import { RootState } from '../../store';

const realtimeLoaderEpic: Epic<StationsAction, StationsAction, RootState> = (action$, state$) => action$.pipe(
  ofType<StartLoadingRealtimeAction>(START_LOADING_REALTIME),
  tap(dbg => console.log(dbg)),
  withLatestFrom(state$),
  tap(dbg => console.log(dbg)),
  mergeMap(([action, state]) => from(state.stations.stations).pipe(
    mergeMap((st) => interval(15000).pipe(
      map(() => loadRealtimeInfo(false, st.stationId))
    ))
  )));

const loadStationsEpic: Epic<StationsAction, StationsAction, RootState> = (action$) => action$.pipe(
  ofType<LoadStationsAction>(LOAD_STATIONS),
  mergeMap(action =>
    getStationsApi(action.payload.isServer).pipe(
      map(stations => loadStationsSuccess(action.payload.isServer, stations))
    )));

const refreshRealtimeEpic: Epic<StationsAction, StationsAction, RootState> = (action$, state$) => action$.pipe(
  ofType<RefreshRealtimeAction>(REFRESH_REALTIME),
  withLatestFrom(state$),
  mergeMap(([action, state]) => from(state.stations.stations).pipe(
    map(st => loadRealtimeInfo(false, st.stationId)
    ))));

const loadRealtimeEpic = (action$, state) => action$.pipe(
  ofType(LOAD_REALTIME_INFO),
  mergeMap<any, any>(action =>
    getRealtimeApi(action.payload.stationId, action.payload.isServer).pipe(
      map(realtimeInfo => loadRealtimeInfoSuccess(action.payload.stationId, realtimeInfo))
    )
  ));

const stationsEpic = combineEpics(realtimeLoaderEpic, loadStationsEpic, loadRealtimeEpic, refreshRealtimeEpic);

export default stationsEpic;

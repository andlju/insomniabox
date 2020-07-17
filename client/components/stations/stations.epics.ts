import { ofType, combineEpics, Epic } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import { map, mergeMap, tap, takeUntil, filter, withLatestFrom } from 'rxjs/operators';
import { LOAD_STATIONS, loadStationsSuccess, START_LOADING_REALTIME, STOP_LOADING_REALTIME, loadStations, LoadStationsAction, StationsAction, loadRealtimeInfo, LOAD_REALTIME_INFO, loadRealtimeInfoSuccess, StartLoadingRealtimeAction } from './stations.actions';
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

const loadStationsEpic = (action$) => action$.pipe(
  ofType(LOAD_STATIONS),
  mergeMap<any, any>(action =>
    getStationsApi(action.payload.isServer).pipe(
      map(stations => loadStationsSuccess(stations))
    )));

const loadRealtimeEpic = (action$, state) => action$.pipe(
  ofType(LOAD_REALTIME_INFO),
  mergeMap<any, any>(action =>
    getRealtimeApi(action.payload.stationId, action.payload.isServer).pipe(
      map(realtimeInfo => loadRealtimeInfoSuccess(action.payload.stationId, realtimeInfo))
    )
  ));

const stationsEpic = combineEpics(realtimeLoaderEpic, loadStationsEpic, loadRealtimeEpic);

export default stationsEpic;

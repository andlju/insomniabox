import { ofType, combineEpics, Epic } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import { map, mergeMap, tap, takeUntil, filter } from 'rxjs/operators';
import { LOAD_STATIONS, loadStationsSuccess, START_LOADING_REALTIME, STOP_LOADING_REALTIME, loadStations, LoadStationsAction, StationsAction, loadRealtimeInfo, LOAD_REALTIME_INFO, loadRealtimeInfoSuccess } from './stations.actions';
import { interval, Observable } from 'rxjs';
import { getStationsApi, getRealtimeApi } from '../../services/station.service';
import { StationModel } from './stations.model';

const realtimeLoaderEpic = (action$, store) => action$.pipe(
  ofType(START_LOADING_REALTIME),
  mergeMap(action =>
    interval(5000).pipe(
      tap(() => console.log("Loading realtime")),
      map(() => loadRealtimeInfo(false, "1337")),
      takeUntil(
        action$.ofType(STOP_LOADING_REALTIME)
      )
    )));

const loadStationsEpic = (action$) => action$.pipe(
  ofType(LOAD_STATIONS),
  mergeMap<any, any>(action => 
    getStationsApi(action.payload.isServer).pipe(
      map(stations => loadStationsSuccess(stations))
  )));

const loadRealtimeEpic = (action$) => action$.pipe(
  ofType(LOAD_REALTIME_INFO),
  mergeMap<any, any>(action =>
    getRealtimeApi(action.payload.stationId, action.payload.isServer).pipe(
      map(realtimeInfo => loadRealtimeInfoSuccess(action.payload.stationId, realtimeInfo))
    )
));

const stationsEpic = combineEpics(realtimeLoaderEpic, loadStationsEpic, loadRealtimeEpic);

export default stationsEpic;

import { ofType, combineEpics, Epic } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import { map, mergeMap, tap, takeUntil, filter } from 'rxjs/operators';
import { LOAD_STATIONS, loadStationsSuccess, START_LOADING_STATIONS, STOP_LOADING_STATIONS, loadStations, LoadStationsAction, StationsAction } from './stations.actions';
import { interval, Observable } from 'rxjs';
import { getStationsApi } from '../../services/station.service';
import { StationModel } from './stations.model';

const stationsLoaderEpic = (action$) => action$.pipe(
  ofType(START_LOADING_STATIONS),
  mergeMap(action =>
    interval(5000).pipe(
      tap(() => console.log("Loading stations")),
      map(() => loadStations(false)),
      takeUntil(
        action$.ofType(STOP_LOADING_STATIONS)
      )
    )));

const loadStationsEpic = (action$) => action$.pipe(
  ofType(LOAD_STATIONS),
  mergeMap<any, any>(action => 
    getStationsApi(action.payload.isServer).pipe(
      map(stations => loadStationsSuccess(stations))
  )));

const stationsEpic = combineEpics(stationsLoaderEpic, loadStationsEpic);

export default stationsEpic;

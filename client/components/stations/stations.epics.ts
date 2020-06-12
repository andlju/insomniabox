import { ofType, combineEpics } from 'redux-observable';
import { request } from 'universal-rxjs-ajax';
import { map, mergeMap, tap, takeUntil } from 'rxjs/operators';
import { LOAD_STATIONS, loadStationsSuccess, START_LOADING_STATIONS, STOP_LOADING_STATIONS, loadStations } from './stations.actions';
import { StationModel } from './stations.model';
import { interval } from 'rxjs';

const stationsLoaderEpic = (action$) => action$.pipe(
  ofType(START_LOADING_STATIONS),
  mergeMap(action =>
    interval(5000).pipe(
      tap(() => console.log("Loading stations")),
      map(() => loadStations()),
      takeUntil(
        action$.ofType(STOP_LOADING_STATIONS)
      )
    )));

const loadStationsEpic = (action$) => action$.pipe(
  ofType(LOAD_STATIONS),
  mergeMap(action => request({ url: `/api/stations` }).pipe(
    map<any, StationModel[]>(resp => resp.response.Stations.map(s => {
      return { stationId : s.StationId, name: s.Name, direction: "Norrut" }
    })),
    map(stations => loadStationsSuccess(stations))
  )));

const stationsEpic = combineEpics(stationsLoaderEpic, loadStationsEpic);

export default stationsEpic;

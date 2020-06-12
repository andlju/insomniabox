import { StationModel } from "../components/stations/stations.model";
import { request } from "universal-rxjs-ajax";
import { map, tap } from "rxjs/operators";
import { stationsSample } from "../pages/api/stations";
import { of, Observable } from "rxjs";

export function getStationsApi(isServer: boolean) {
  console.log(`Getting stations. isServer: ${isServer}`);
  const rawStations$: Observable<any> = isServer ? of({ response: stationsSample }) : request({ url: `/api/stations` });
  return rawStations$.pipe(
    tap(resp => console.log(resp)),
    map(resp => resp.response.Stations.map(s => {
      return { stationId: s.StationId, name: s.Name, direction: "Norrut" }
    })));
};
import { StationModel } from "../components/stations/stations.model";
import { request } from "universal-rxjs-ajax";
import { map, tap } from "rxjs/operators";
import { stationsSample } from "../pages/api/stations";
import { of, Observable } from "rxjs";
import { realtimeSample } from "../pages/api/station/[stationId]/realtime";

export function getStationsApi(isServer: boolean) {
  console.log(`Getting stations. isServer: ${isServer}`);
  const rawStations$: Observable<any> = isServer ? of({ response: stationsSample }) : request({ url: `/api/stations` });
  return rawStations$.pipe(
    tap(resp => console.log(resp)),
    map(resp => resp.response.Stations.map(s => {
      return { stationId: s.StationId, name: s.Name, defaultDirectionId: s.DefaultJourneyDirection, direction: s.DefaultJourneyDirection === 1 ? "Norrut" : "Söderut" }
    })));
};

export function getRealtimeApi(stationId: string, isServer: boolean) {
  console.log(`Getting realtimeInfo. isServer: ${isServer}`);
  const rawStations$: Observable<any> = isServer ? of({ response: realtimeSample }) : request({ url: `/api/station/${stationId}/realtime` });
  return rawStations$.pipe(
    tap(resp => console.log(resp)),
    map(resp => {
      return {
        journeys: resp.response.Station?.Metros.map(m => {
          return { journeyId: m.JourneyNumber.toString(), destination: m.Destination, displayTime: m.DisplayTime, lineNumber: m.LineNumber, directionId: m.JourneyDirection }
        })
      }
    }));
};
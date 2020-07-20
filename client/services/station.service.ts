import { StationModel, RealtimeInfoModel, JourneyModel } from "../components/stations/stations.model";
import { request } from "universal-rxjs-ajax";
import moment from "moment";
import { map, tap } from "rxjs/operators";
import { configSample } from "../pages/api/config";
import { getStationRealtime } from "../pages/api/stations/[stationId]/realtime";

import { of, Observable, defer } from "rxjs";

export function getStationsApi(isServer: boolean) : Observable<StationModel[]> {
  const rawStations$: Observable<any> = isServer ? of({ response: configSample }) : request({ url: `/api/config` });
  return rawStations$.pipe(
    tap(resp => console.log(resp)),
    map(resp => resp.response.Stations.map(s => {
      return { 
        stationId: s.StationId,
        name: s.Name,
        siteId: s.SiteId,
        minuteMargin: s.MinuteMargin,
        defaultDirectionId: s.DefaultJourneyDirection,
        direction: s.DefaultJourneyDirection === 1 ? "Norrut" : "Söderut",
       } as StationModel
    })));
};

export function getRealtimeApi(siteId: string, isServer: boolean) : Observable<RealtimeInfoModel> {
  const rawStations$: Observable<any> = isServer ? defer(() => { response: getStationRealtime(siteId) }) : request({ url: `/api/stations/${siteId}/realtime` });
  return rawStations$.pipe(
    map(resp => {
      return {
        journeys: resp.response.Station?.Metros.map(m => {
          return {
            journeyId: m.JourneyNumber.toString(),
            destination: m.Destination,
            displayTime: m.DisplayTime,
            expectedDateTime: moment(m.ExpectedDateTime).toDate(),
            lineNumber: m.LineNumber,
            directionId: m.JourneyDirection,
          } as JourneyModel
        })
      }
    }));
};
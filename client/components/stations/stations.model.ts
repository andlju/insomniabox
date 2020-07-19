
export interface StationsState {
  loading: boolean;
  stations: StationModel[];
};

export interface StationModel {
  stationId: string,
  name: string,
  direction: string,
  siteId: string,
  defaultDirectionId: number,
  minuteMargin: number,
  realtimeInfo: RealtimeInfoModel
};

export interface RealtimeInfoModel {
  journeys: JourneyModel[]
};

export interface JourneyModel {
  journeyId: string,
  destination: string,
  displayTime: string,
  lineNumber: string,
  directionId: number
};

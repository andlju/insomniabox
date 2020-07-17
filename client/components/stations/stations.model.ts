
export interface StationsState {
  loading: boolean;
  stations: StationModel[];
};

export interface StationModel {
  stationId: string,
  name: string,
  direction: string,
  defaultDirectionId: number,
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

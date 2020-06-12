
export interface StationsState {
  loading: boolean;
  stations: StationModel[];
};

export interface StationModel {
  stationId: string,
  name: string,
  direction: string
};

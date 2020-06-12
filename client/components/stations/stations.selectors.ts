import { RootState } from "../../store";

export const getStations = (state: RootState) => state.stations;

export const getAllStationIds = () => (state: RootState) => getStations(state).stations.map(s => s.stationId);

export const getStation = (stationId: string) => (state : RootState) => getStations(state).stations.find(s => s.stationId === stationId);
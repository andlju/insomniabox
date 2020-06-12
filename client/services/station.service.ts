import { StationModel } from "../components/stations/stations.model";

export function getStationsApi() : StationModel[] {
  return [
    { stationId: "1", name: "Hägerstensåsen", direction: "Norrut"},
    { stationId: "2", name: "Axelsberg", direction: "Norrut"}
  ];
};
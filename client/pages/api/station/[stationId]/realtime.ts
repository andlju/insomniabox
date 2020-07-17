import axios from "axios";

const SL_STATIONS_KEY = process.env.SL_STATIONS_KEY;
const SL_REALTIME_KEY = process.env.SL_REALTIME_KEY;

const SL_STATIONS_URL = `https://api.sl.se/api2/typeahead.json?key=${SL_STATIONS_KEY}&stationsonly=True&maxresults=5`;
const SL_REALTIME_URL = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${SL_REALTIME_KEY}&timewindow=30`;

export const realtimeSample = {
  "Station": {
    "LatestUpdate": "2020-06-12T16:42:01",
    "DataAge": 47,
    "Metros": [
      {
        "GroupOfLine": "tunnelbanans röda linje",
        "DisplayTime": "Nu",
        "TransportMode": "METRO",
        "LineNumber": "14",
        "Destination": "Mörby centrum",
        "JourneyDirection": 1,
        "StopAreaName": "Hägerstensåsen",
        "StopAreaNumber": 2831,
        "StopPointNumber": 2831,
        "StopPointDesignation": "1",
        "TimeTabledDateTime": "2020-06-12T16:42:15",
        "ExpectedDateTime": "2020-06-12T16:43:08",
        "JourneyNumber": 20167,
        "Deviations": null
      },
      {
        "GroupOfLine": "tunnelbanans röda linje",
        "DisplayTime": "4 min",
        "TransportMode": "METRO",
        "LineNumber": "14",
        "Destination": "Fruängen",
        "JourneyDirection": 2,
        "StopAreaName": "Hägerstensåsen",
        "StopAreaNumber": 2831,
        "StopPointNumber": 2832,
        "StopPointDesignation": "2",
        "TimeTabledDateTime": "2020-06-12T16:47:00",
        "ExpectedDateTime": "2020-06-12T16:47:14",
        "JourneyNumber": 20545,
        "Deviations": null
      }
    ],
    "Buses": [],
    "Trains": [],
    "Trams": [],
    "Ships": [],
    "StopPointDeviations": [
      {
        "StopInfo": {
          "StopAreaNumber": 2831,
          "StopAreaName": "Hägerstensåsen",
          "TransportMode": "METRO",
          "GroupOfLine": "tunnelbanans röda linje"
        },
        "Deviation": {
          "Text": "Tack för att du följer Folkhälsomyndighetens rekommendationer och visar hänsyn när du reser!",
          "Consequence": null,
          "ImportanceLevel": 2
        }
      }
    ]
  }
};

export default async (req, res) => {
  res.statusCode = 200
  console.log("Getting realtime info on server");
  const stationId = req.query.stationId;
  try {
    const resp = await axios.get(SL_REALTIME_URL + `&siteId=${stationId}`);
    res.json({ Station: resp.data.ResponseData });
  } catch (error) {
    console.log('Error', error);
    res.json(error);
  }
};
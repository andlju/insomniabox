
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

export default (req, res) => {
  res.statusCode = 200

  res.json(realtimeSample);
}

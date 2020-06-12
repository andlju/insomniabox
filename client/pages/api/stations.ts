// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200

  const stationsSample = {
    "Stations": [
      {
        "Name": "Hägerstensåsen",
        "StationId": 1337,
        "Metros": [
          {
            "LineNumber": 13,
            "Destination": "Mörby Centrum",
            "DisplayTime": "3 min",
            "Direction": 1
          },
          {
            "LineNumber": 13,
            "Destination": "Fruängen",
            "DisplayTime": "4 min",
            "Direction": 2
          },
          {
            "LineNumber": 13,
            "Destination": "Mörby Centrum",
            "DisplayTime": "8 min",
            "Direction": 1
          },
          {
            "LineNumber": 13,
            "Destination": "Fruängen",
            "DisplayTime": "12 min",
            "Direction": 2
          }
        ]
      },
      {
        "Name": "Axelsberg",
        "StationId": 1338,
        "Metros": [
          {
            "LineNumber": 13,
            "Destination": "Alvik",
            "DisplayTime": "3 min",
            "Direction": 2
          },
          {
            "LineNumber": 13,
            "Destination": "Ropsten",
            "DisplayTime": "4 min",
            "Direction": 1
          },
          {
            "LineNumber": 13,
            "Destination": "Norsborg",
            "DisplayTime": "8 min",
            "Direction": 2
          },
          {
            "LineNumber": 13,
            "Destination": "Ropsten",
            "DisplayTime": "12 min",
            "Direction": 1
          }
        ]
      },
      {
        "Name": "Västertorp",
        "StationId": 1437,
        "Metros": [
          {
            "LineNumber": 13,
            "Destination": "Mörby Centrum",
            "DisplayTime": "2 min",
            "Direction": 1
          },
          {
            "LineNumber": 13,
            "Destination": "Fruängen",
            "DisplayTime": "3 min",
            "Direction": 2
          },
          {
            "LineNumber": 13,
            "Destination": "Mörby Centrum",
            "DisplayTime": "7 min",
            "Direction": 1
          },
          {
            "LineNumber": 13,
            "Destination": "Fruängen",
            "DisplayTime": "13 min",
            "Direction": 2
          }
        ]
      },
      {
        "Name": "Mälarhöjden",
        "StationId": 1438,
        "Metros": [
          {
            "LineNumber": 13,
            "Destination": "Alvik",
            "DisplayTime": "4 min",
            "Direction": 2
          },
          {
            "LineNumber": 13,
            "Destination": "Ropsten",
            "DisplayTime": "3 min",
            "Direction": 1
          },
          {
            "LineNumber": 13,
            "Destination": "Norsborg",
            "DisplayTime": "9 min",
            "Direction": 2
          },
          {
            "LineNumber": 13,
            "Destination": "Ropsten",
            "DisplayTime": "11 min",
            "Direction": 1
          }
        ]
      }
    ]
  };

  res.json(stationsSample);
}

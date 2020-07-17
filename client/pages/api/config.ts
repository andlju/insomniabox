// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const configSample = {
  "Stations": [
    {
      "Name": "Hägerstensåsen",
      "StationId": "9262",
      "DefaultJourneyDirection": 1
    },
    {
      "Name": "Axelsberg",
      "StationId": "9291",
      "DefaultJourneyDirection": 1
    },
    {
      "Name": "Västertorp",
      "StationId": "9261",
      "DefaultJourneyDirection": 2
    },
    {
      "Name": "Mälarhöjden",
      "StationId": "9290",
      "DefaultJourneyDirection": 2
    }
  ]
};

export default (req, res) => {
  res.statusCode = 200

  res.json(configSample);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const stationsSample = {
  "Stations": [
    {
      "Name": "Hägerstensåsen",
      "StationId": "1337"
    },
    {
      "Name": "Axelsberg",
      "StationId": "1338"
    },
    {
      "Name": "Västertorp",
      "StationId": "1437"
    },
    {
      "Name": "Mälarhöjden",
      "StationId": "1438"
    }
  ]
};

export default (req, res) => {
  res.statusCode = 200

  res.json(stationsSample);
}

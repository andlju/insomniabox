// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const configSample = {
  "Stations": [
    {
      "StationId": "1",
      "Name": "Hägerstensåsen",
      "SiteId": "9262",
      "DefaultJourneyDirection": 1,
      "MinuteMargin": 6
    },
    {
      "StationId": "2",
      "Name": "Axelsberg",
      "SiteId": "9291",
      "DefaultJourneyDirection": 1,
      "MinuteMargin": 9
    },
    {
      "StationId": "3",
      "Name": "Hägerstensåsen",
      "SiteId": "9262",
      "DefaultJourneyDirection": 2,
      "MinuteMargin": 9
    },
    {
      "StationId": "4",
      "Name": "Mälarhöjden",
      "SiteId": "9290",
      "DefaultJourneyDirection": 2,
      "MinuteMargin": 8
    }
  ]
};

export default (req, res) => {
  res.statusCode = 200

  res.json(configSample);
}

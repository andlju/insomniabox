require('dotenv').config()

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;

const SL_STATIONS_KEY = process.env.SL_STATIONS_KEY;
const SL_REALTIME_KEY = process.env.SL_REALTIME_KEY;

const SL_STATIONS_URL = `https://api.sl.se/api2/typeahead.json?key=${SL_STATIONS_KEY}&stationsonly=True&maxresults=5`;
const SL_REALTIME_URL = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${SL_REALTIME_KEY}&timewindow=30`;

app.use(cors());

app.get('/test', (req, res) => {
  res.send('Hello');
});

app.get('/tube/stations', (req, res) => {
  console.log("Stations");
  const searchString = req.query.name;
    axios.get(SL_STATIONS_URL + `&searchstring=${searchString}`)
        .then(response => {
            res.send({Stations:response.data.ResponseData});
        })
        .catch(error => {
          console.log('Error', error);
        });
});

app.get('/tube/stations/:stationId/realtime', (req, res) => {
    console.log("Station");
    const stationId = req.params.stationId;
    axios.get(SL_REALTIME_URL + `&siteId=${stationId}`)
        .then(response => {
            res.send({Station:response.data.ResponseData});
        })
        .catch(error => {
          console.log('Error', error);
        });
});


app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});


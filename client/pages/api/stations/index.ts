import axios from "axios";

const SL_STATIONS_KEY = process.env.SL_STATIONS_KEY;

const SL_STATIONS_URL = `https://api.sl.se/api2/typeahead.json?key=${SL_STATIONS_KEY}&stationsonly=True&maxresults=5`;

export default async (req, res) => {
  res.statusCode = 200
  console.log("Getting station info on server");
  const name = req.query.name;
  try {
    const resp = await axios.get(SL_STATIONS_URL + `&searchstring=${name}`);
    res.json({ Station: resp.data.ResponseData });
  } catch (error) {
    console.log('Error', error);
    res.json(error);
  }
};

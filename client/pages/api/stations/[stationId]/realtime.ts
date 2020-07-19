import axios from "axios";

const SL_REALTIME_KEY = process.env.SL_REALTIME_KEY;

const SL_REALTIME_URL = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${SL_REALTIME_KEY}&timewindow=30`;

export async function getStationRealtime(siteId) {
  const resp = await axios.get(SL_REALTIME_URL + `&siteId=${siteId}`);
  return { Station: resp.data.ResponseData };
};

export default async (req, res) => {
  res.statusCode = 200
  const stationId = req.query.stationId;
  try {
    const resp = await getStationRealtime(stationId);
    res.json(resp);
  } catch (error) {
    console.log('Error', error);
    res.json(error);
  }
};

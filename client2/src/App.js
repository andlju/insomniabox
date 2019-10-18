import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CardDeck } from 'react-bootstrap';
import { fetchStation } from './store/stationActions';

import './App.scss';

import Station from './components/station.js';

const RELOAD_INTERVAL = process.env.REACT_APP_RELOAD_INTERVAL || 60;
console.log('Using a reload interval of', RELOAD_INTERVAL);
function App() {
  const dispatch = useDispatch();
  const stations = useSelector(state => state.stations);
  
  const reloadAll = useCallback(async () => {
    await Promise.all([
      fetchStation(9262, 'Hägerstensåsen')(dispatch),
      fetchStation(9291, 'Axelsberg')(dispatch),
      fetchStation(9261, 'Västertorp')(dispatch),
      fetchStation(9290, 'Mälarhöjden')(dispatch)
    ]);
  }, [dispatch]);

  useEffect(() => {
    // Set up the reloadAll method to be called once every x seconds
    const interval = setInterval(reloadAll, RELOAD_INTERVAL * 1000);
    return () => clearInterval(interval)
  }, [reloadAll]);

  useEffect(() => {
    // Do an initial run of the reloadAll method
    reloadAll();
  }, [reloadAll]);

  return (
    <div className="App container-fluid">
      <CardDeck>
        {stations.map(s => <Station StationId={s.StationId} key={s.StationId} />)}
      </CardDeck>
    </div>
  );
}

export default App;

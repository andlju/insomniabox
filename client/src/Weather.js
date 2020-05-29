import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CardDeck } from 'react-bootstrap';
import { fetchStation } from './store/stationActions';

import './App.scss';

const RELOAD_INTERVAL = process.env.REACT_APP_RELOAD_INTERVAL || 60;

function Weather() {
  const dispatch = useDispatch();
  return (
    <div className="App container-fluid">
      <CardDeck>
        <ForecastDay Id="" />
      </CardDeck>
    </div>
  );
}

export default App;

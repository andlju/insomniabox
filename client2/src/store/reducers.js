import { combineReducers } from 'redux';
import stations from './stationReducers';

const insomniaApp = combineReducers({
    stations
});

export default insomniaApp;
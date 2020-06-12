import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import { stationsReducer } from '../components/stations/stations.reducers';
import stationsEpics from '../components/stations/stations.epics';

const rootEpic = combineEpics(
  stationsEpics
);

const rootReducer = combineReducers({
  stations: stationsReducer
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    // if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

const epicMiddleware = createEpicMiddleware();

let store;

const initStore = (initialState) => {
  const epicMiddleware = createEpicMiddleware()
  const logger = createLogger({ collapsed: true }) // log every action to see what's happening behind the scenes.
  const reduxMiddleware = applyMiddleware(epicMiddleware, logger)

  const store = createStore(reducer, initialState, reduxMiddleware)
  epicMiddleware.run(rootEpic)

  return store
}

export const wrapper = createWrapper(initStore)

export type RootState = ReturnType<typeof rootReducer>;


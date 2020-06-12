import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import { stationsReducer } from '../components/stations/stations.reducers';
import stationsEpics from '../components/stations/stations.epics';
import { loadStations } from '../components/stations/stations.actions';
import { useMemo } from 'react';

const rootEpic = combineEpics(
  stationsEpics
);

const rootReducer = combineReducers({
  stations: stationsReducer
});

const epicMiddleware = createEpicMiddleware();

let store;

const initStore = (initialState) => {
  const epicMiddleware = createEpicMiddleware()
  const logger = createLogger({ collapsed: true }) // log every action to see what's happening behind the scenes.
  const reduxMiddleware = applyMiddleware(epicMiddleware, logger)

  const store = createStore(rootReducer, initialState, reduxMiddleware)
  epicMiddleware.run(rootEpic)

  return store
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export type RootState = ReturnType<typeof rootReducer>;


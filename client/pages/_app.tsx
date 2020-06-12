import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useStore } from '../store';
import { loadStations, startLoadingStations } from '../components/stations/stations.actions';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
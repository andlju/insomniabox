import Head from 'next/head';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Station from '../../components/stations/station';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffect } from 'react';
import { startLoadingRealtime, stopLoadingRealtime, loadStations, refreshRealtime } from '../../components/stations/stations.actions';
import { RootState, wrapper } from '../../store';
import { NextPage } from 'next';
import { getStation } from '..//../components/stations/stations.selectors';
import { StationModel } from '../../components/stations/stations.model';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.text.secondary,
  },
  grid: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const useStation = (stationId) => {
  return useSelector<RootState, StationModel>(getStation(stationId));
};


function StationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { stationId } = router.query
  const station = useStation(stationId);

  useEffect(() => {
    dispatch(refreshRealtime());
    dispatch(startLoadingRealtime());
    return () => {
      dispatch(stopLoadingRealtime());
    }
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Head>
        <title>Insomniabox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CssBaseline />

      <Station stationId={station.stationId} />
    </div>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(loadStations(true));
  }
)

export default connect(null)(StationPage);
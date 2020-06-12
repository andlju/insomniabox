import Head from 'next/head';
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import Station from '../components/stations/station';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffect } from 'react';
import { startLoadingStations, stopLoadingStations, loadStations } from '../components/stations/stations.actions';
import { RootState, wrapper } from '../store';
import { NextPage } from 'next';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.text.secondary,
  },
  grid: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const useAllStationIds = () => {
  return useSelector<RootState, string[]>(
    (state) => state.stations.stations.map(s => s.stationId));
};


function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stationIds = useAllStationIds();
  useEffect(() => {
    dispatch(startLoadingStations());
    return () => {
      dispatch(stopLoadingStations());
    }
  }, [dispatch]);
  
  return (
    <div className={classes.root}>
      <Head>
        <title>Insomniabox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CssBaseline />

      <Grid container spacing={2} className={classes.grid}>
        {stationIds.map(s =>
          (<Grid item xs={6} md={3} key={s}>
            <Station stationId={s} />
          </Grid>)
        )}
      </Grid>
    </div>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(loadStations(true));
  }
)

export default connect(null)(Home);
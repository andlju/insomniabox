import Head from 'next/head';
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import Station from '../components/stations/station';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffect } from 'react';
import { startLoadingRealtime, stopLoadingRealtime, loadStations, refreshRealtime } from '../components/stations/stations.actions';
import { RootState, wrapper } from '../store';
import { NextPage } from 'next';
import { bindActionCreators } from 'redux';
import { getAllStationIds } from '../components/stations/stations.selectors';

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
  return useSelector<RootState, string[]>(getAllStationIds());
};


function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stationIds = useAllStationIds();
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
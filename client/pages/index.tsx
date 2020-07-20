import Head from 'next/head';
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import Station from '../components/stations/station';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffect } from 'react';
import { startLoadingRealtime, stopLoadingRealtime, loadStations, refreshRealtime } from '../components/stations/stations.actions';
import { RootState, wrapper } from '../store';
import { NextPage } from 'next';
import { bindActionCreators } from 'redux';
import { getAllStations } from '../components/stations/stations.selectors';
import { StationModel } from '../components/stations/stations.model';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  grid: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const useAllStations = () => {
  return useSelector<RootState, StationModel[]>(getAllStations());
};


function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stations = useAllStations();
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
      <Grid container>
        <Grid item md={false} lg={2}></Grid>
        <Grid item md={12} lg={8}>
          <Grid container spacing={2} className={classes.grid}>
            {stations.map(s =>
              (<Grid item xs={12} md={6} key={s.stationId}>
                <Station stationId={s.stationId} />
              </Grid>)
            )}
          </Grid>
        </Grid>
        <Grid item md={false} lg={2}></Grid>
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
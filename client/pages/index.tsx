import Head from 'next/head';
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import Station from '../components/stations/station';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startLoadingStations, stopLoadingStations } from '../components/stations/stations.actions';
import { RootState } from '../store';

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


export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stationIds = useAllStationIds();
  useEffect(() => {
    dispatch(startLoadingStations())
    return () => {
      dispatch(stopLoadingStations())
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
          (<Grid item xs={6} md={3}>
            <Station stationId={s} />
          </Grid>)
        )}
      </Grid>
    </div>
  )
};

import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Table, TableBody, TableRow, TableCell, Typography, makeStyles, CardMedia, CardActionArea, LinearProgress, Collapse, responsiveFontSizes } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { StationsState, StationModel, JourneyModel } from './stations.model';
import { RootState } from '../../store';
import { getStation } from './stations.selectors';

export interface StationProps {
  stationId: string
};

const useStyles = makeStyles((theme) => ({
  preferredOverlay: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backdropFilter: 'brightness(70%)'
  },
  minutes: {
    color: theme.palette.primary.contrastText,
    fontWeight: 700,
    fontSize: '3em',
    textAlign: 'center'
  },
  destination: {
    color: theme.palette.secondary.contrastText,
    fontWeight: 700,
    fontSize: '1.5em',
    textAlign: 'center'
  },
  preferred: {
    '& td': {
      backgroundColor: theme.palette.background.default,
      fontWeight: 600
    }
  },
  loaderContainer: {
    height: 5
  },
  stationMedia: {
    height: 160
  }
}));

const useStation = (stationId) => {
  return useSelector<RootState, StationModel>(getStation(stationId));
};

class JourneysProps {
  journeys: JourneyModel[];
  preferredJourneyId: string
}

function Journeys({ journeys, preferredJourneyId }: JourneysProps) {
  const classes = useStyles();

  return (
    <Table>
      <TableBody>
        {
          journeys.map(j => {
            const isPreferred = j.journeyId === preferredJourneyId;
            return (
              <TableRow key={j.journeyId} className={isPreferred ? classes.preferred : ""}>
                <TableCell>{j.displayTime}</TableCell>
                <TableCell>{j.destination}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
}

export default function Station({ stationId }: StationProps) {
  const { name, direction, realtimeInfo } = useStation(stationId);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={name}
        subheader={direction}
      />
      <div className={classes.loaderContainer}>
        {realtimeInfo?.loading ? (<LinearProgress></LinearProgress>) : (<> </>)}
      </div>
      <CardActionArea onClick={handleExpandClick}>
        <CardMedia
          className={classes.stationMedia}
          image={`/images/station_${stationId}.jpg`}>
          {realtimeInfo?.preferred ? (
            <div className={classes.preferredOverlay}>
              <Typography className={classes.minutes}>
                {realtimeInfo.preferred.displayTime}
              </Typography>
              <Typography className={classes.destination}>
                {realtimeInfo.preferred.destination}
              </Typography>
            </div>
          ) : (<></>)}
        </CardMedia>
      </CardActionArea>
      <Collapse in={expanded}>
        <CardContent>
          {realtimeInfo?.journeys ?
            (<Journeys journeys={realtimeInfo.journeys} preferredJourneyId={realtimeInfo.preferred?.journeyId}></Journeys>) : <> </>}
        </CardContent>
      </Collapse>
    </Card >
  );
}

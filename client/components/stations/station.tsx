import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Table, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { StationsState, StationModel } from './stations.model';
import { RootState } from '../../store';
import { getStation } from './stations.selectors';

export interface StationProps {
  stationId: string
};

const useStation = (stationId) => {
  return useSelector<RootState, StationModel>(getStation(stationId));
};

export default function Station({ stationId }: StationProps) {
  const { name, direction, defaultDirectionId: directionId, realtimeInfo } = useStation(stationId);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={name}
        subheader={direction}
      />
      <CardContent>
        {realtimeInfo?.journeys ?
          (<Table>
            <TableBody>
              {
                realtimeInfo.journeys.filter(j => j.directionId === directionId).map(j => (
                  <TableRow key={j.journeyId}>
                    <TableCell>{j.displayTime}</TableCell>
                    <TableCell>{j.destination}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>) : <Typography>Loading</Typography>}
      </CardContent>
    </Card>
  );
}

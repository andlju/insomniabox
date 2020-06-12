import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { StationsState, StationModel } from './stations.model';
import { RootState } from '../../store';

export interface StationProps {
  stationId: string
};

const useStation = (stationId) => {
  return useSelector<RootState, StationModel>(
    (state) => state.stations.stations.find(s => s.stationId === stationId));
};

export default function Station({ stationId }: StationProps) {
  const { name, direction } = useStation(stationId);

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
        <Typography>
          Hej hej
        </Typography>
      </CardContent>
    </Card>
  );
}

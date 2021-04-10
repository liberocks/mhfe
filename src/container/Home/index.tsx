/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { Grid } from '@material-ui/core';

import { MAX_X } from '../../constant';

import { getLandmarks } from './api';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { useStateManager } from './useStateManager';

export const Home: React.FC = () => {
  const stateManager = useStateManager();
  const { loading, setLoading, landmarkState, setLandmarkState } = stateManager;

  React.useEffect(() => {
    setLoading(true);
    getLandmarks().then(({ data: landmarks }) => {
      for (const landmark of landmarks) {
        if (landmark.type === 'wall') {
          landmarkState[landmark.x + landmark.y * MAX_X] = 1;
        } else if (landmark.type === 'rack') {
          landmarkState[landmark.x + landmark.y * MAX_X] = 2;
        }
        setLandmarkState([...landmarkState]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Grid container>
      <LeftPanel stateManager={stateManager} />
      <RightPanel stateManager={stateManager} />
    </Grid>
  );
};

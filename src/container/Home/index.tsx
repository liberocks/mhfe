import React from 'react';

import { Grid } from '@material-ui/core';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { useStateManager } from './useStateManager';

export const Home: React.FC = () => {
  const stateManager = useStateManager();

  return (
    <Grid container>
      <LeftPanel stateManager={stateManager} />
      <RightPanel stateManager={stateManager} />
    </Grid>
  );
};

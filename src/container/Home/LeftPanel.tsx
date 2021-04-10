/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Grid, Tab, Tabs, Paper, Typography } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import LayersIcon from '@material-ui/icons/Layers';
import CategoryIcon from '@material-ui/icons/PersonPin';

import { ShowIf } from '../../components';

import { Inbound } from './Inbound';
import { Landmark } from './Landmark';
import { Outbound } from './Outbound';

export const LeftPanel: React.FC<any> = ({ stateManager }) => {
  const { tab, setTab } = stateManager;

  const handleChange = (event: any, newValue: any) => {
    setTab(newValue);
  };

  return (
    <Grid item xs={3} style={{ height: '98vh' }}>
      <Paper square>
        <Tabs value={tab} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
          <Tab icon={<ExploreIcon />} label="Outbound" />
          <Tab icon={<LayersIcon />} label="Landmark" />
          <Tab icon={<CategoryIcon />} label="Inbound" />
        </Tabs>
      </Paper>
      <ShowIf cond={tab === 0}>
        <Outbound stateManager={stateManager} />
      </ShowIf>
      <ShowIf cond={tab === 1}>
        <Landmark stateManager={stateManager} />
      </ShowIf>
      <ShowIf cond={tab === 2}>
        <Inbound stateManager={stateManager} />
      </ShowIf>
    </Grid>
  );
};

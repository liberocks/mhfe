/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Grid } from '@material-ui/core';

export const RightPanel: React.FC<any> = ({ stateManager }) => {
  return <Grid item xs={9} style={{ background: '#f0f', height: '98vh' }}></Grid>;
};

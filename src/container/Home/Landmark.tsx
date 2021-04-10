/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { TextField, Grid, Typography, Button, Divider } from '@material-ui/core';

export const Landmark: React.FC<any> = ({ stateManager }) => {
  const { tab } = stateManager;
  return (
    <>
      <Typography style={{ margin: 10, marginBottom: 0, fontWeight: 'bold' }}>Add new landmark</Typography>
      <Grid container direction="column" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Grid item>
          <TextField
            label="Coordinate X"
            placeholder="Coordinate X"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Coordinate Y"
            placeholder="Coordinate Y"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Type of Landmark"
            placeholder="Type of Landmark"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Capacity"
            placeholder="Capacity"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" style={{ width: '100%', marginTop: 20 }}>
            Add
          </Button>
        </Grid>
        <Grid item>
          <Typography style={{ marginTop: 20, fontSize: 14, fontWeight: 300, textAlign: 'center' }}>
            or click on the map to add wall landmark
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

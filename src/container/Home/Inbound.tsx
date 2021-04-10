/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Typography, Grid, TextField, Button } from '@material-ui/core';

export const Inbound: React.FC<any> = ({ stateManager }) => {
  const { tab } = stateManager;
  return (
    <>
      <Typography style={{ margin: 10, marginBottom: 0, fontWeight: 'bold' }}>New inbound item</Typography>
      <Grid container direction="column" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Grid item>
          <TextField
            label="Name"
            placeholder="Name"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="SKU Code"
            placeholder="SKU Code"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item>
          <TextField
            label="Stock"
            placeholder="Stock"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

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
          <Button variant="contained" color="primary" style={{ width: '100%', marginTop: 20 }}>
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

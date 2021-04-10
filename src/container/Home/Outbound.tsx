/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Grid, TextField, Button, Typography } from '@material-ui/core';

export const Outbound: React.FC<any> = ({ stateManager }) => {
  const { itemsToFind, setItemsToFind } = stateManager;

  return (
    <>
      <Typography style={{ margin: 10, marginBottom: 0, fontWeight: 'bold' }}>Find routes</Typography>
      <Grid container direction="column" style={{ paddingLeft: 10, paddingRight: 10 }}>
        {(itemsToFind as string[]).map((item, index) => (
          <Grid item>
            <TextField
              value={item}
              label="Item"
              placeholder="Name or SKU Code"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        ))}

        <Grid item style={{ marginTop: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%' }}
                onClick={() => {
                  itemsToFind.pop();
                  setItemsToFind([...itemsToFind]);
                }}
              >
                Decrease
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setItemsToFind([...itemsToFind, '']);
                }}
              >
                Increase
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" style={{ width: '100%', marginTop: 10 }}>
            Find best route
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

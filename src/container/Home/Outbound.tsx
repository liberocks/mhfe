/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Grid, TextField, Button, Typography } from '@material-ui/core';

import { postRoute } from './api';

export const Outbound: React.FC<any> = ({ stateManager }) => {
  const { itemsToFind, setItemsToFind, loading, setLoading, setLoadingMessage, setBestRoute, setNewPackets } = stateManager;

  return (
    <>
      <Typography style={{ margin: 10, marginBottom: 0, fontWeight: 'bold' }}>Find routes</Typography>
      <Grid container direction="column" style={{ paddingLeft: 10, paddingRight: 10 }}>
        {(itemsToFind as string[]).map((item, index) => (
          <Grid item>
            <TextField
              value={item}
              onChange={(e) => {
                itemsToFind[index] = e.target.value;
                setItemsToFind([...itemsToFind]);
              }}
              label="Item id"
              placeholder="Item id"
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
          <Button
            variant="contained"
            color="primary"
            style={{ width: '100%', marginTop: 10 }}
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                setLoadingMessage('Finding best route...');
                const { data: allocation } = await postRoute(itemsToFind);

                setBestRoute(allocation.best);
                setNewPackets(allocation.newPackets);
                setLoadingMessage(null);
                setLoading(false);
              } catch (e) {
                setLoading(false);
                setLoadingMessage(null);
              }
            }}
          >
            Find best route
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

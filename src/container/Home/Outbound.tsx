/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Grid, TextField, Button, Typography } from '@material-ui/core';

import { ShowIf } from '../../components';

import { postRoute } from './api';

export const Outbound: React.FC<any> = ({ stateManager }) => {
  const { itemsToFind, bestRoute, setItemsToFind, setBestRoute, setNewPackets } = stateManager;
  const [localLoading, setLocalLoading] = React.useState(false);
  const [localLoadingMessage, setLocalLoadingMessage] = React.useState<string | null>('');

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
            disabled={localLoading}
            onClick={async () => {
              try {
                setLocalLoading(true);
                setLocalLoadingMessage('Finding best route...');
                const { data: allocation } = await postRoute(itemsToFind);

                setBestRoute(allocation.best);
                setNewPackets(allocation.newPackets);
                setLocalLoadingMessage(null);
                setLocalLoading(false);
              } catch (e) {
                setLocalLoading(false);
                setLocalLoadingMessage(null);
              }
            }}
          >
            {localLoading ? localLoadingMessage : 'Find best route'}
          </Button>
        </Grid>
      </Grid>

      <ShowIf cond={!!bestRoute && bestRoute.points}>
        <div style={{ marginLeft: 10 }}>
          <Typography style={{ fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>Best Route</Typography>
          {bestRoute &&
            bestRoute.points &&
            bestRoute.points.map((point: any, index: number) => {
              return (
                <>
                  <Typography style={{ fontSize: 16, marginTop: 10 }}>
                    {index + 1}. Rack on coordinate ({point.x},{point.y})
                  </Typography>
                  <ShowIf cond={index !== bestRoute.points.length - 1}>
                    <Typography style={{ fontSize: 12, marginTop: 5, marginLeft: 20 }}>
                      point {index + 1} {'->'} point {index + 2} is spanned along {bestRoute.distances[index]} meter(s){' '}
                    </Typography>
                  </ShowIf>
                </>
              );
            })}
          <Typography style={{ fontSize: 16, marginTop: 10 }}>Total distance {bestRoute && bestRoute.totalDistance} meter(s)</Typography>
        </div>
      </ShowIf>
    </>
  );
};

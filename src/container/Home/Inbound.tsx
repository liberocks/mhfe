/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Typography, Grid, TextField, Button } from '@material-ui/core';

import { ShowIf } from '../../components';

import { postPacket } from './api';

export const Inbound: React.FC<any> = ({ stateManager }) => {
  const { inboundForm, setInboundForm, bestRoute, newPackets, setNewPackets, setBestRoute } = stateManager;

  const [localLoading, setLocalLoading] = React.useState(false);
  const [localLoadingMessage, setLocalLoadingMessage] = React.useState<string | null>('');

  return (
    <>
      <Typography style={{ margin: 10, marginBottom: 0, fontWeight: 'bold' }}>New inbound item</Typography>
      <Grid container direction="column" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Grid item>
          <TextField
            value={inboundForm.name}
            onChange={(e) => {
              setInboundForm({ ...inboundForm, name: e.target.value });
            }}
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
            value={inboundForm.SKUCode}
            onChange={(e) => {
              setInboundForm({ ...inboundForm, SKUCode: e.target.value });
            }}
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
            value={inboundForm.stock}
            onChange={(e) => {
              setInboundForm({ ...inboundForm, stock: parseInt(e.target.value) });
            }}
            type="number"
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
          <Button
            variant="contained"
            color="primary"
            style={{ width: '100%', marginTop: 20 }}
            disabled={localLoading}
            onClick={() => {
              setLocalLoading(true);
              setLocalLoadingMessage('Finding best rack to store...');
              postPacket(inboundForm.stock, inboundForm.name, inboundForm.SKUCode)
                .then((res) => {
                  const { data: allocation } = res;

                  setBestRoute(allocation.best);
                  setNewPackets(allocation.newPackets);
                  setLocalLoadingMessage(null);
                  setLocalLoading(false);
                })
                .catch((e) => {
                  console.log(e.message);
                  setLocalLoadingMessage(null);
                  setLocalLoading(false);
                });
            }}
          >
            {localLoading ? 'Finding best racks to store' : 'Add'}
          </Button>
        </Grid>

        <ShowIf cond={!!bestRoute}>
          <Typography style={{ fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>Best Route</Typography>
          {bestRoute &&
            bestRoute.points.map((point: any, index: number) => {
              let item = newPackets && newPackets.filter((packet: any) => packet.x === point.x && packet.y === point.y);
              if (item.length > 0) item = item[0];

              return (
                <>
                  <Typography style={{ fontSize: 16, marginTop: 10 }}>
                    {index + 1}. Rack on coordinate ({point.x},{point.y}){item && ` stores ${item.stock} item(s)`}
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
        </ShowIf>
      </Grid>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Typography, Grid, TextField, Button } from '@material-ui/core';

import { ShowIf } from '../../components';

import { postPacket } from './api';

export const Inbound: React.FC<any> = ({ stateManager }) => {
  const { inboundForm, setInboundForm, loading, setLoading, bestRoute, setAlternativeRoutes, setBestRoute, setLoadingMessage } = stateManager;
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
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                setLoadingMessage('Finding best rack to store...');
                const res = await postPacket(inboundForm.stock, inboundForm.name, inboundForm.SKUCode);
                const { data: allocation } = res;

                setBestRoute(allocation.best);
                setAlternativeRoutes(allocation.alternatives);
              } catch (e) {
                console.log(e.message);
              } finally {
                setLoadingMessage(null);
                setLoading(false);
              }
            }}
          >
            Add
          </Button>
        </Grid>

        <ShowIf cond={!!bestRoute}>
          <Typography style={{ fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>Best Route</Typography>
          {bestRoute &&
            bestRoute.points.map((point: any, index: number) => {
              return (
                <>
                  <Typography style={{ fontSize: 16, marginTop: 10 }}>
                    {index + 1}. Rack on coordinate ({point.x},{point.y}){' '}
                    {bestRoute.newPackets.filter((packet: any) => packet.x === point.x && packet.y === point.y)[0].stock} item(s)
                  </Typography>
                  <ShowIf cond={index !== bestRoute.points.length - 1}>
                    <Typography style={{ fontSize: 14, marginTop: 5, marginLeft: 20 }}>
                      point {index + 1} {'->'} point {index + 2} {bestRoute.distances[index]} meter{' '}
                    </Typography>
                  </ShowIf>
                </>
              );
            })}
          <Typography style={{ fontSize: 16, marginTop: 10 }}>Total distance {bestRoute && bestRoute.totalDistance} m</Typography>
        </ShowIf>
      </Grid>
    </>
  );
};

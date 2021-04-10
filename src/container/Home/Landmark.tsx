/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { TextField, Grid, Typography, Button } from '@material-ui/core';

import { MAX_X } from '../../constant';

import { putLandmark } from './api';

export const Landmark: React.FC<any> = ({ stateManager }) => {
  const { landmarkForm, loading, setLandmarkForm, setLoading, landmarkState, setLandmarkState } = stateManager;

  return (
    <>
      <Typography style={{ margin: 10, marginBottom: 0, fontWeight: 'bold' }}>Add new landmark</Typography>
      <Grid container direction="column" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Grid item>
          <TextField
            value={landmarkForm.x}
            onChange={(e) => {
              setLandmarkForm({ ...landmarkForm, x: parseInt(e.target.value) });
            }}
            type="number"
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
            value={landmarkForm.y}
            onChange={(e) => {
              setLandmarkForm({ ...landmarkForm, y: parseInt(e.target.value) });
            }}
            type="number"
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
            value={landmarkForm.type}
            onChange={(e) => {
              setLandmarkForm({ ...landmarkForm, type: e.target.value });
            }}
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
            value={landmarkForm.capacity}
            onChange={(e) => {
              setLandmarkForm({ ...landmarkForm, capacity: parseInt(e.target.value) });
            }}
            type="number"
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
          <Button
            variant="contained"
            color="primary"
            style={{ width: '100%', marginTop: 20 }}
            onClick={() => {
              setLoading(true);
              putLandmark(landmarkForm.x, landmarkForm.y, landmarkForm.type, landmarkForm.capacity).then(() => {
                if (landmarkForm.type === 'wall') {
                  landmarkState[landmarkForm.x + landmarkForm.y * MAX_X] = 1;
                } else if (landmarkForm.type === 'rack') {
                  landmarkState[landmarkForm.x + landmarkForm.y * MAX_X] = 2;
                }
                setLandmarkState([...landmarkState]);
                setLoading(false);
              });
            }}
            disabled={loading}
          >
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

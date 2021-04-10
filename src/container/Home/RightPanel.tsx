/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Typography, CircularProgress, Snackbar, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';
import Sketch from 'react-p5';

import { ShowIf } from '../../components';
import { MAX_X, MAX_Y } from '../../constant';

import { getLandmark, getPackets, putLandmark } from './api';

const dim = 20;

export const RightPanel: React.FC<any> = ({ stateManager }) => {
  const {
    loadingMessage,
    setLoadingMessage,
    currentCoordinate,
    setCurrentCoordinate,
    tab,
    loading,
    setLoading,
    landmarkState,
    setLandmarkState,
    bestRoute,
    alternativeRoutes,
    itemOnClickedCoordinate,
    setItemOnClickedCoordinate,
    landmarkOnClickedCoordinate,
    setLandmarkOnClickedCoordinate,
  } = stateManager;

  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(dim * MAX_X, dim * MAX_Y).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background(0);

    for (let x = 0; x < MAX_X; x++) {
      for (let y = 0; y < MAX_Y; y++) {
        p5.strokeWeight(1);
        p5.stroke(225);

        if (landmarkState[x + y * MAX_X] === 1) {
          p5.fill(0, 0, 0);
        } else if (landmarkState[x + y * MAX_X] === 2) {
          p5.fill(255, 64, 64);
        } else {
          p5.fill(255, 255, 255);
        }

        if (p5.mouseX > x * dim && p5.mouseX < (x + 1) * dim && p5.mouseY > y * dim && p5.mouseY < (y + 1) * dim) {
          setCurrentCoordinate([x, y]);
          p5.fill(225, 225, 225);
        }

        p5.rect(x * dim, y * dim, dim, dim);

        if (bestRoute && bestRoute.route.length >= 4) {
          const { route } = bestRoute;

          for (let i = 0; i < -2 + bestRoute.route.length; i += 2) {
            try {
              p5.stroke(0, 255, 0);
              p5.strokeWeight(3);
              p5.line(dim / 2 + dim * route[i + 1], dim / 2 + dim * route[i + 0], dim / 2 + dim * route[i + 3], dim / 2 + dim * route[i + 2]);
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
    }
  };

  const mouseClicked = async (p5: any) => {
    const x = Math.floor(p5.mouseX / dim);
    const y = Math.floor(p5.mouseY / dim);
    p5.fill(0, 0, 0);
    p5.rect(x * dim, y * dim, dim, dim);

    if (tab === 1 && x >= 0 && y >= 0 && !loading) {
      setLoading(true);
      setLoadingMessage('Validating landmark...');
      const landmark = await getLandmark(x, y);

      setLoadingMessage('Allocating landmark...');
      if (landmark.data.type === 'wall') {
        await putLandmark(x, y, null);
        landmarkState[x + y * MAX_X] = 0;
      } else if (landmark.data.type === null) {
        await putLandmark(x, y, 'wall');
        landmarkState[x + y * MAX_X] = 1;
      }
      setLandmarkState([...landmarkState]);
    } else if (tab === 0 && x >= 0 && y >= 0 && !loading) {
      setLoading(true);
      setLoadingMessage('Fetching landmark...');

      const {
        data: { clickedLandmark },
      } = await getLandmark(x, y);
      setLandmarkOnClickedCoordinate(clickedLandmark);

      const {
        data: { docs: packets },
      } = await getPackets(x, y);
      setItemOnClickedCoordinate(packets);
    }

    setLoadingMessage(null);
    setLoading(false);
  };

  return (
    <>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      <ShowIf cond={loading}>
        <div style={{ bottom: 10, left: '35vw', position: 'absolute' }}>
          <Typography style={{ fontSize: 18 }}>
            <CircularProgress size={18} /> {loadingMessage}
          </Typography>
        </div>
      </ShowIf>
      <Typography style={{ bottom: 10, left: '25vw', position: 'absolute', fontSize: 18 }}>
        Coordinate ({currentCoordinate[0]},{currentCoordinate[1]})
      </Typography>
      <Typography style={{ bottom: 10, right: 20, position: 'absolute', fontSize: 18, fontWeight: 'bold' }}>Maphouse</Typography>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={itemOnClickedCoordinate && itemOnClickedCoordinate.length > 0}
        autoHideDuration={6000}
        onClose={() => {
          setItemOnClickedCoordinate([]);
        }}
        message={[
          landmarkOnClickedCoordinate && (
            <Typography style={{ marginTop: 5 }}>Available rack capacity {landmarkOnClickedCoordinate.capacity} item(s)</Typography>
          ),
          ...(itemOnClickedCoordinate as Record<string, any>[]).map((item) => {
            return (
              <Typography style={{ marginTop: 5 }}>
                [{item._id}] {item.name} ({item.SKUCode}) total {item.stock} stock(s)
              </Typography>
            );
          }),
        ]}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setItemOnClickedCoordinate([]);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Typography, CircularProgress } from '@material-ui/core';

import _ from 'lodash';
import Sketch from 'react-p5';

import { ShowIf } from '../../components';
import { MAX_X, MAX_Y } from '../../constant';

import { getLandmark, putLandmark, ruok } from './api';

const dim = 20;

export const RightPanel: React.FC<any> = ({ stateManager }) => {
  const { currentCoordinate, setCurrentCoordinate, tab, loading, setLoading, landmarkState, setLandmarkState } = stateManager;

  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(dim * MAX_X, dim * MAX_Y).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background(0);

    for (let x = 0; x < MAX_X; x++) {
      for (let y = 0; y < MAX_Y; y++) {
        p5.strokeWeight(1);
        p5.stroke(225);

        if (!!landmarkState[x + y * MAX_X]) {
          p5.fill(0, 0, 0);
        } else if (p5.mouseX > x * dim && p5.mouseX < (x + 1) * dim && p5.mouseY > y * dim && p5.mouseY < (y + 1) * dim) {
          setCurrentCoordinate([x, y]);
          p5.fill(225, 225, 225);
        } else {
          p5.fill(255, 255, 255);
        }

        p5.rect(x * dim, y * dim, dim, dim);
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
      const landmark = await getLandmark(x, y);
      if (landmark.data.type !== null) {
        await putLandmark(x, y, null);
        landmarkState[x + y * MAX_X] = 0;
      } else {
        await putLandmark(x, y, 'wall');
        landmarkState[x + y * MAX_X] = 1;
      }
      setLandmarkState([...landmarkState]);
    }

    setLoading(false);
  };

  return (
    <>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      <ShowIf cond={loading}>
        <CircularProgress style={{ bottom: 15, left: '35vw', position: 'absolute' }} size={20} />
      </ShowIf>
      <Typography style={{ bottom: 10, left: '25vw', position: 'absolute', fontSize: 18 }}>
        Coordinate ({currentCoordinate[0]},{currentCoordinate[1]})
      </Typography>
      <Typography style={{ bottom: 10, right: 20, position: 'absolute', fontSize: 18, fontWeight: 'bold' }}>Maphouse</Typography>
    </>
  );
};

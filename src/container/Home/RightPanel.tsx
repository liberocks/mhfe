/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { Typography } from '@material-ui/core';

import Sketch from 'react-p5';

import { MAX_X, MAX_Y } from '../../constant';

import { ruok } from './api';

const dim = 20;

export const RightPanel: React.FC<any> = ({ stateManager }) => {
  const { currentCoordinate, setCurrentCoordinate } = stateManager;

  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(dim * MAX_X, dim * MAX_Y).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background(0);

    for (let x = 0; x < MAX_X; x++) {
      for (let y = 0; y < MAX_Y; y++) {
        p5.strokeWeight(1);
        p5.stroke(225);

        if (p5.mouseX > x * dim && p5.mouseX < (x + 1) * dim && p5.mouseY > y * dim && p5.mouseY < (y + 1) * dim) {
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

    const res = await ruok();
    alert(JSON.stringify(res));
  };

  return (
    <>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      <Typography style={{ bottom: 10, left: '25vw', position: 'absolute', fontSize: 18 }}>
        Coordinate ({currentCoordinate[0]},{currentCoordinate[1]})
      </Typography>
      <Typography style={{ bottom: 10, right: 20, position: 'absolute', fontSize: 18, fontWeight: 'bold' }}>Maphouse</Typography>
    </>
  );
};

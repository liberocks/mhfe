/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

export const useStateManager = () => {
  // General state
  const [tab, setTab] = React.useState<any>(0);

  // Outbound page state
  const [itemsToFind, setItemsToFind] = React.useState<any[]>(['']);

  // Landmark page state
  const [landmarkForm, setLandmarkForm] = React.useState<any>({ x: null, y: null, type: null });

  // Right panel state
  const [currentCoordinate, setCurrentCoordinate] = React.useState([0, 0]);

  return { landmarkForm, setLandmarkForm, tab, setTab, itemsToFind, setItemsToFind, currentCoordinate, setCurrentCoordinate };
};

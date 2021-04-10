/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

import { MAX_X, MAX_Y } from '../../constant';

export const useStateManager = () => {
  // General state
  const [tab, setTab] = React.useState<any>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = React.useState<string | null>(null);
  const [itemOnClickedCoordinate, setItemOnClickedCoordinate] = React.useState<any[]>([]);
  const [landmarkOnClickedCoordinate, setLandmarkOnClickedCoordinate] = React.useState<any>(null);

  // Outbound page state
  const [itemsToFind, setItemsToFind] = React.useState<any[]>(['']);

  // Landmark page state
  const [landmarkForm, setLandmarkForm] = React.useState<any>({ x: null, y: null, type: null, capacity: 0 });

  // Invound page state
  const [inboundForm, setInboundForm] = React.useState<any>({ name: null, SKUCode: null, stock: 0 });

  // Right panel state
  const [currentCoordinate, setCurrentCoordinate] = React.useState([0, 0]);
  const [alternativeRoutes, setAlternativeRoutes] = React.useState<any>([]);
  const [bestRoute, setBestRoute] = React.useState<any>(null);
  const [newPackets, setNewPackets] = React.useState<any>([]);

  const landmarkGrid: any[] = [];
  for (let x = 0; x < MAX_X; x++) {
    for (let y = 0; y < MAX_Y; y++) {
      landmarkGrid.push(0);
    }
  }
  const [landmarkState, setLandmarkState] = React.useState<any[]>(landmarkGrid);

  return {
    landmarkForm,
    setLandmarkForm,
    tab,
    setTab,
    itemsToFind,
    setItemsToFind,
    currentCoordinate,
    setCurrentCoordinate,
    loading,
    setLoading,
    landmarkState,
    setLandmarkState,
    inboundForm,
    setInboundForm,
    loadingMessage,
    setLoadingMessage,
    alternativeRoutes,
    setAlternativeRoutes,
    bestRoute,
    setBestRoute,
    newPackets,
    setNewPackets,
    itemOnClickedCoordinate,
    setItemOnClickedCoordinate,
    landmarkOnClickedCoordinate,
    setLandmarkOnClickedCoordinate,
  };
};

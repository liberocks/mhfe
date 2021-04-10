/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

import { MAX_X, MAX_Y } from '../../constant';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const ruok = () => {
  return axios.get(`${API_BASE_URL}/ruok`);
};

export const getLandmark = (x: any, y: any) => {
  return axios.get(`${API_BASE_URL}/landmark/${x}/${y}`);
};

export const getLandmarks = () => {
  return axios.get(`${API_BASE_URL}/landmarks?maximum_x=${MAX_X}&maximum_y=${MAX_Y}`);
};

export const getPackets = (x: number, y: number) => {
  return axios.get(`${API_BASE_URL}/packets?x=${x}&y=${y}`);
};

export const putLandmark = (x: any, y: any, type: null | string = 'wall', capacity = 0) => {
  return axios.put(`${API_BASE_URL}/landmark`, { x, y, type, capacity });
};

export const postPacket = (stock: any, name: any, SKUCode: any) => {
  return axios.post(`${API_BASE_URL}/packet`, { stock, name, SKUCode, maximum_x: MAX_X, maximum_y: MAX_Y, shape_x: MAX_X, shape_y: MAX_Y });
};

export const postRoute = (packet_ids: string[]) => {
  return axios.post(`${API_BASE_URL}/route`, {
    packet_ids: packet_ids.filter((packet_id) => packet_id),
    maximum_x: MAX_X,
    maximum_y: MAX_Y,
    shape_x: MAX_X,
    shape_y: MAX_Y,
  });
};

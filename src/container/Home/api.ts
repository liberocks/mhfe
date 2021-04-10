/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

// const API_BASE_URL = 'http://ec2-3-238-181-74.compute-1.amazonaws.com:8000';
const API_BASE_URL = 'http://0.0.0.0:8000';

export const ruok = () => {
  return axios.get(`${API_BASE_URL}/ruok`);
};

export const getLandmark = (x: any, y: any) => {
  return axios.get(`${API_BASE_URL}/landmark/${x}/${y}`);
};

export const getLandmarks = () => {
  return axios.get(`${API_BASE_URL}/landmarks`);
};

export const putLandmark = (x: any, y: any, type: null | string = 'wall', capacity = 0) => {
  return axios.put(`${API_BASE_URL}/landmark`, { x, y, type, capacity });
};

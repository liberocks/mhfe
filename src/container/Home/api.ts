/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

const API_BASE_URL = 'http://192.168.43.13:8000';
export const ruok = () => {
  return axios.get(`${API_BASE_URL}/ruok`);
};

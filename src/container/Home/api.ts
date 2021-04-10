/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

const API_BASE_URL = 'http://ec2-3-238-181-74.compute-1.amazonaws.com:8000';
export const ruok = () => {
  return axios.get(`${API_BASE_URL}/ruok`);
};

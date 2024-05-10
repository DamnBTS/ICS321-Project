// import axios from 'axios';

// const API_URL = 'http://localhost:5173/'; // Replace with your API URL

// const api = axios.create({
//   baseURL: API_URL,
// });

// export const login = (email, password) => {
//   return api.post('/login', { email, password });
// };

// export const getPassengers = () => {
//   return api.get('/passengers');
// };

// Add other API methods as needed

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your API URL

const api = axios.create({
  baseURL: API_URL,
});

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const getPassengers = () => {
  return api.get('/passengers');
};


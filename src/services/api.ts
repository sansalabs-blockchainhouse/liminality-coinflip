import axios from 'axios';

const api = axios.create({
  baseURL: 'https://coinflip-api.herokuapp.com/'
});

export { api };

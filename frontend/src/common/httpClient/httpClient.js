import axios from 'axios';
const {
  REACT_APP_BASE_URL,
} = process.env;
const httpClient = axios.create({baseURL: REACT_APP_BASE_URL ? REACT_APP_BASE_URL : "http://localhost:5000"})

export default httpClient;

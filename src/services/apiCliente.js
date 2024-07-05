import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://localhost:7296/api',
});

export default apiCliente;
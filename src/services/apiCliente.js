import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'https://localhost:7296/',
});

export default apiCliente;
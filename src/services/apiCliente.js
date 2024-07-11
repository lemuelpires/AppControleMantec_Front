import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default apiCliente;
import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default apiCliente;
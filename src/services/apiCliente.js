import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://192.168.0.2:5001/api',
});

export default apiCliente;
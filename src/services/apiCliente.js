import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://192.168.1.111:80/api',
});

export default apiCliente;
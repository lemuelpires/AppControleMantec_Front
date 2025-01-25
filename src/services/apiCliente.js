import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'https://www.portalmantec.com.br:5002/api',
});

export default apiCliente;
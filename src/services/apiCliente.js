import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://www.portalmantec.com.br:5000/api',
});

export default apiCliente;
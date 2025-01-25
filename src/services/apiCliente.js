import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'https://www.portalmantec.com.br:5004/api',
});

export default apiCliente;
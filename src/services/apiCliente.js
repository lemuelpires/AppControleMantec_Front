import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://www.portalmantec.com.br:5010/api',
});


export default apiCliente;
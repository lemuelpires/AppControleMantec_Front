import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'https://www.portalmantec.com.br/mantec/api',
});


export default apiCliente;
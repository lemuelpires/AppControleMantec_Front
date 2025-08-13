import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'http://www.portalmantec.com.br/mantec2/api',
});


export default apiCliente;
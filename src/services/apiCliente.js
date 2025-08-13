import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'https://www.portalmantec.com.br/mantec2/api',
});


export default apiCliente;
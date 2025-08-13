import axios from 'axios';

const apiCliente = axios.create({
  /*baseURL: 'https://www.portalmantec.com.br/mantec/api',*/
    baseURL: 'http://www.portalmantec.com.br:5010/api',
  /*baseURL: 'http://localhost:5003/api',*/
});


export default apiCliente;
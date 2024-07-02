import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import FormularioOrdemDeServico from '../../../Forms/FormularioOrdemDeServico'; // Importe o formulário de ordem de serviço
import apiCliente from '../../../../services/apiCliente';
import apiFuncionario from '../../../../services/apiCliente';
import apiProduto from '../../../../services/apiCliente';
import apiServico from '../../../../services/apiCliente';
import apiOrdemDeServico from '../../../../services/apiCliente'; // Importe a API de ordem de serviço
import { Titulo } from './style';

// Definir as classes do Modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#1f1e1e',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    inset: 'unset',
  },
};

const ModalNovaOrdemDeServico = ({ isOpen, onClose }) => {
  const [clienteOptions, setClienteOptions] = useState([]);
  const [funcionarioOptions, setFuncionarioOptions] = useState([]);
  const [produtoOptions, setProdutoOptions] = useState([]);
  const [servicoOptions, setServicoOptions] = useState([]);
  const [formData, setFormData] = useState({
    clienteID: '',
    funcionarioID: '',
    produtoID: '',
    servicoID: '',
    dataEntrada: '',
    dataConclusao: '',
    status: '',
    observacoes: '',
    ativo: true,
  });

  useEffect(() => {
    fetchClientes();
    fetchFuncionarios();
    fetchProdutos();
    fetchServicos();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await apiCliente.get('/Cliente');
      const clientes = response.data.filter(cliente => cliente.ativo).map(cliente => ({
        value: cliente.id,
        label: cliente.nome,
      }));
      setClienteOptions(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchFuncionarios = async () => {
    try {
      const response = await apiFuncionario.get('/Funcionario');
      const funcionarios = response.data.filter(funcionario => funcionario.ativo).map(funcionario => ({
        value: funcionario.id,
        label: funcionario.nome,
      }));
      setFuncionarioOptions(funcionarios);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await apiProduto.get('/Produto');
      const produtos = response.data.filter(produto => produto.ativo).map(produto => ({
        value: produto.id,
        label: produto.nome,
      }));
      setProdutoOptions(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await apiServico.get('/Servico');
      const servicos = response.data.filter(servico => servico.ativo).map(servico => ({
        value: servico.id,
        label: servico.nome,
      }));
      setServicoOptions(servicos);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleSelectChange = (selectedOption, action) => {
    setFormData({
      ...formData,
      [action.name]: selectedOption ? selectedOption.value : '',
    });
  };

  const handleSubmit = async (formData) => {
    try {
      // Converter datas para o formato ISO
      const dataEntrada = formData.dataEntrada ? new Date(formData.dataEntrada).toISOString() : null;
      const dataConclusao = formData.dataConclusao ? new Date(formData.dataConclusao).toISOString() : null;

      const ordemDeServicoDto = {
        ...formData,
        dataEntrada,
        dataConclusao,
      };

      await apiOrdemDeServico.post('/OrdemDeServico', ordemDeServicoDto);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayElement={(props, contentElement) => (
        <div {...props}>{contentElement}</div>
      )}
      contentElement={(props, children) => (
        <div {...props}>{children}</div>
      )}
      style={modalStyles}
    >
      <Titulo>
        <h2>Adicionar Ordem de Serviço</h2>
      </Titulo>
      <FormularioOrdemDeServico
        initialValues={formData}
        onSubmit={handleSubmit}
        onClose={onClose}
        clienteOptions={clienteOptions}
        funcionarioOptions={funcionarioOptions}
        produtoOptions={produtoOptions}
        servicoOptions={servicoOptions}
        handleSelectChange={handleSelectChange}
      />
    </Modal>
  );
};

export default ModalNovaOrdemDeServico;

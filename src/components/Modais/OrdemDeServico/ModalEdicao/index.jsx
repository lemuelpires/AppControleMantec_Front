import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioOrdemDeServico from '../../../Forms/FormularioOrdemDeServico';
import { Titulo } from './style';
import apiCliente from '../../../../services/apiCliente';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#1f1e1e',
    padding: '2em 4em',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '90%', // Ajustado para 90% da largura
    width: 'auto', // Ajustado para tamanho automático para expandir conforme necessário
    inset: 'unset',
    margin: 'auto', // Centraliza horizontalmente
  },
};

const ModalEdicaoOrdemDeServico = ({ isOpen, onClose, item, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
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

  const [clienteOptions, setClienteOptions] = useState([]);
  const [funcionarioOptions, setFuncionarioOptions] = useState([]);
  const [produtoOptions, setProdutoOptions] = useState([]);
  const [servicoOptions, setServicoOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientes = await apiCliente.get('/Cliente');
        const funcionarios = await apiCliente.get('/Funcionario');
        const produtos = await apiCliente.get('/Produto');
        const servicos = await apiCliente.get('/Servico');

        setClienteOptions(clientes.data.map(cliente => ({ value: cliente.id, label: cliente.nome })));
        setFuncionarioOptions(funcionarios.data.map(funcionario => ({ value: funcionario.id, label: funcionario.nome })));
        setProdutoOptions(produtos.data.map(produto => ({ value: produto.id, label: produto.nome })));
        setServicoOptions(servicos.data.map(servico => ({ value: servico.id, label: servico.nome })));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        clienteID: item.clienteID,
        funcionarioID: item.funcionarioID,
        produtoID: item.produtoID,
        servicoID: item.servicoID,
        dataEntrada: item.dataEntrada,
        dataConclusao: item.dataConclusao,
        status: item.status,
        observacoes: item.observacoes,
        ativo: item.ativo,
      });
    }
  }, [item, isOpen]);

  const handleSelectChange = (selectedOption, action) => {
    setFormData({
      ...formData,
      [action.name]: selectedOption ? selectedOption.value : '',
    });
  };

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  if (!item) return null;

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
        <h2>Editar Ordem de Serviço</h2>
      </Titulo>
      <FormularioOrdemDeServico
        initialValues={formData}
        onSubmit={handleSubmit}
        onClose={onClose}
        handleSelectChange={handleSelectChange}
        clienteOptions={clienteOptions}
        funcionarioOptions={funcionarioOptions}
        produtoOptions={produtoOptions}
        servicoOptions={servicoOptions}
      />
    </Modal>
  );
};

export default ModalEdicaoOrdemDeServico;

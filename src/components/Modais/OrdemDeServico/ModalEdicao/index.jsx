import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioOrdemDeServico from '../../../Forms/FormularioOrdemDeServico';
import apiCliente from '../../../../services/apiCliente';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: 'transparent',
    padding: '1rem',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    maxWidth: '650px',
    width: '95%',
    maxHeight: '90vh',
    inset: 'unset',
    zIndex: 10000,
    position: 'relative',
    overflow: 'visible',
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
       const formatDate = (dateStr) => {
      return dateStr ? new Date(dateStr).toISOString().slice(0, 10) : '';
    };
      setFormData({
        id: item.id,
        clienteID: item.clienteID,
        funcionarioID: item.funcionarioID,
        produtoID: item.produtoID,
        servicoID: item.servicoID,
        dataEntrada: formatDate(item.dataEntrada),
        dataConclusao: formatDate(item.dataConclusao),
        status: item.status,
        observacoes: item.observacoes,
        ativo: item.ativo,
      });
    }
  }, [item, isOpen]);

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviÃ§o:', error);
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
      <FormularioOrdemDeServico
        title="Editar Ordem de Serviço"
        initialValues={formData}
        onSubmit={handleSubmit}
        onClose={onClose}
        clienteOptions={clienteOptions}
        funcionarioOptions={funcionarioOptions}
        produtoOptions={produtoOptions}
        servicoOptions={servicoOptions}
      />
    </Modal>
  );
};

export default ModalEdicaoOrdemDeServico;


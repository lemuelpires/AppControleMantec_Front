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
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    inset: 'unset',
  },
};

const ModalEdicaoOrdemDeServico = ({ isOpen, onClose, item, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: item ? item.id : '',
    clienteID: item ? item.clienteID : '',
    funcionarioID: item ? item.funcionarioID : '',
    produtoID: item ? item.produtoID : '',
    servicoID: item ? item.servicoID : '',
    dataEntrada: item ? item.dataEntrada : '',
    dataConclusao: item ? item.dataConclusao : '',
    status: item ? item.status : '',
    observacoes: item ? item.observacoes : '',
    ativo: item ? item.ativo : true,
  });

  const [clienteOptions, setClienteOptions] = useState([]);
  const [funcionarioOptions, setFuncionarioOptions] = useState([]);
  const [produtoOptions, setProdutoOptions] = useState([]);
  const [servicoOptions, setServicoOptions] = useState([]);

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
  }, [item]);

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

  const handleSelectChange = (selectedOption, action) => {
    setFormData({
      ...formData,
      [action.name]: selectedOption ? selectedOption.value : '',
    });
  };

  const handleSubmit = async (data) => {
    if (!data.id) {
      console.error('Erro ao salvar ordem de serviço: ID da ordem de serviço está ausente.');
      return;
    }

    try {
      const dataEntrada = data.dataEntrada ? new Date(data.dataEntrada).toISOString() : null;
      const dataConclusao = data.dataConclusao ? new Date(data.dataConclusao).toISOString() : null;

      const ordemDeServicoDto = {
        ...data,
        dataEntrada,
        dataConclusao,
      };

      await apiCliente.put(`/OrdemDeServico/${data.id}`, ordemDeServicoDto);
      onSubmit(data);
      alert('Ordem de Serviço atualizada com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
      console.log('formData:', data);
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
        <h2>Editar Ordem de Serviço</h2>
      </Titulo>
      <FormularioOrdemDeServico
        initialValues={formData}
        onSubmit={handleSubmit}
        onClose={onClose}
        handleSelectChange={handleSelectChange}
        clienteOptions={clienteOptions} // Passando as opções com nome em vez de id
        funcionarioOptions={funcionarioOptions} // Passando as opções com nome em vez de id
        produtoOptions={produtoOptions} // Passando as opções com nome em vez de id
        servicoOptions={servicoOptions} // Passando as opções com nome em vez de id
      />
    </Modal>
  );
};

export default ModalEdicaoOrdemDeServico;

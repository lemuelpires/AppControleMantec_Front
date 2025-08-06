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
    maxWidth: '750px',
    width: '95%',
    maxHeight: '90vh',
    inset: 'unset',
    zIndex: 10000,
    position: 'relative',
    overflow: 'auto',
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
    produtos: [{ produtoID: '', quantidade: 1 }],
    servicos: [{ servicoID: '', quantidade: 1 }],
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
      const response = await apiCliente.get('/Funcionario');
      const funcionarios = response.data.filter(funcionario => funcionario.ativo).map(funcionario => ({
        value: funcionario.id,
        label: funcionario.nome,
      }));
      setFuncionarioOptions(funcionarios);
    } catch (error) {
      console.error('Erro ao buscar funcionÃ¡rios:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await apiCliente.get('/Produto');
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
      const response = await apiCliente.get('/Servico');
      const servicos = response.data.filter(servico => servico.ativo).map(servico => ({
        value: servico.id,
        label: servico.nome,
      }));
      setServicoOptions(servicos);
    } catch (error) {
      console.error('Erro ao buscar serviÃ§os:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      console.log('Dados do formulário antes do envio:', formData);
      
      const dataEntrada = formData.dataEntrada ? new Date(formData.dataEntrada).toISOString() : null;
      const dataConclusao = formData.dataConclusao ? new Date(formData.dataConclusao).toISOString() : null;

      // Preparar dados mantendo compatibilidade com backend atual
      const ordemDeServicoDto = {
        ...formData,
        dataEntrada,
        dataConclusao,
        // Manter compatibilidade - pegar o primeiro item se existir
        produtoID: formData.produtos?.[0]?.produtoID || null,
        servicoID: formData.servicos?.[0]?.servicoID || null,
        quantidadeProduto: formData.produtos?.[0]?.quantidade || 1,
        quantidadeServico: formData.servicos?.[0]?.quantidade || 1,
        // Manter arrays para futuro uso
        produtos: formData.produtos || [],
        servicos: formData.servicos || []
      };

      console.log('DTO a ser enviado:', ordemDeServicoDto);

      const response = await apiCliente.post('/OrdemDeServico', ordemDeServicoDto);
      console.log('Ordem de ServiÃ§o criada:', response.data);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviÃ§o:', error.response ? error.response.data : error.message);
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
      <FormularioOrdemDeServico
        title="Nova Ordem de Serviço"
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

export default ModalNovaOrdemDeServico;


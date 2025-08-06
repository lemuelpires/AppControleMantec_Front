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

const ModalEdicaoOrdemDeServico = ({ isOpen, onClose, item, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
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

        // Filtrar apenas dados ativos
        setClienteOptions(clientes.data.filter(cliente => cliente.ativo).map(cliente => ({ value: cliente.id, label: cliente.nome })));
        setFuncionarioOptions(funcionarios.data.filter(funcionario => funcionario.ativo).map(funcionario => ({ value: funcionario.id, label: funcionario.nome })));
        setProdutoOptions(produtos.data.filter(produto => produto.ativo).map(produto => ({ value: produto.id, label: produto.nome })));
        setServicoOptions(servicos.data.filter(servico => servico.ativo).map(servico => ({ value: servico.id, label: servico.nome })));
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
      
      // Converter dados antigos (simples) para novo formato (arrays)
      let produtos = [{ produtoID: '', quantidade: 1 }];
      let servicos = [{ servicoID: '', quantidade: 1 }];
      
      // Se existir produtos/serviços salvos como array, usar eles
      if (item.produtos && Array.isArray(item.produtos) && item.produtos.length > 0) {
        produtos = item.produtos;
      } else if (item.produtoID) {
        // Conversão de formato antigo para novo
        produtos = [{ produtoID: item.produtoID, quantidade: item.quantidadeProduto || 1 }];
      }
      
      if (item.servicos && Array.isArray(item.servicos) && item.servicos.length > 0) {
        servicos = item.servicos;
      } else if (item.servicoID) {
        // Conversão de formato antigo para novo
        servicos = [{ servicoID: item.servicoID, quantidade: item.quantidadeServico || 1 }];
      }
      
      setFormData({
        id: item.id,
        clienteID: item.clienteID,
        funcionarioID: item.funcionarioID,
        produtos: produtos,
        servicos: servicos,
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
      console.log('Dados do formulário de edição antes do envio:', data);
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


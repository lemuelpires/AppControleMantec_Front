import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioEstoque from '../../../Forms/FormularioEstoque';
import apiCliente from '../../../../services/apiCliente';

// Estilos do modal
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
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    maxWidth: '650px',
    width: '95%',
    maxHeight: '90vh',
    inset: 'unset',
    zIndex: 10000,
    position: 'relative',
    overflow: 'visible',
  },
};

const ModalNovoEstoque = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    produtoID: '',
    quantidade: '',
    dataAtualizacao: new Date().toISOString().slice(0, 16),
    ativo: true,
  });
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchProdutos();
    }
  }, [isOpen]);

  const fetchProdutos = async () => {
    try {
      const response = await apiCliente.get('/Produto');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProdutos([]);
    }
  };

  const handleSubmit = async (formValues) => {
    try {
      const formattedData = {
        ...formValues,
        dataAtualizacao: new Date(formValues.dataAtualizacao).toISOString(),
      };
      await onSubmit(formattedData);
      alert('Novo item de inventário criado com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao criar item de estoque:', error);
      if (error.response && error.response.data) {
        alert(`Erro: ${error.response.data}`);
      } else {
        alert('Erro ao criar item de estoque.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <FormularioEstoque 
        title="Novo Item de Estoque"
        initialValues={formData} 
        produtos={produtos}
        onSubmit={handleSubmit} 
        onClose={onClose} 
      />
    </Modal>
  );
};

export default ModalNovoEstoque;


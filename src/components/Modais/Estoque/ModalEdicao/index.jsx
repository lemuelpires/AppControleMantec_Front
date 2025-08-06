import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioEstoque from '../../../Forms/FormularioEstoque';
import apiCliente from '../../../../services/apiCliente';

// Modal styles
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

const ModalEdicaoEstoque = ({ isOpen, onClose, item, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchProdutos();
    }
  }, [isOpen]);

  useEffect(() => {
    if (item) {
      // Formatar a data para datetime-local se necessário
      const dataFormatada = item.dataAtualizacao ? 
        new Date(item.dataAtualizacao).toISOString().slice(0, 16) : 
        new Date().toISOString().slice(0, 16);
      
      setFormData({
        ...item,
        dataAtualizacao: dataFormatada
      });
    }
  }, [item]);

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
        id: item.id,
        dataAtualizacao: new Date(formValues.dataAtualizacao).toISOString(),
      };
      await onSubmit(formattedData);
      alert('Item de estoque atualizado com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar item de estoque:', error);
      if (error.response && error.response.data) {
        alert(`Erro: ${error.response.data}`);
      } else {
        alert('Erro ao atualizar item de estoque.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      {item && (
        <FormularioEstoque 
          title="Editar Item de Estoque"
          initialValues={formData} 
          produtos={produtos}
          onSubmit={handleSubmit} 
          onClose={onClose} 
        />
      )}
    </Modal>
  );
};

export default ModalEdicaoEstoque;


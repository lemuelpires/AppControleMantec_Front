import React from 'react';
import Modal from 'react-modal';
import FormularioProduto from '../../../Forms/FormularioProduto';
import { Titulo } from './style';
import apiCliente from '../../../../services/apiCliente';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    padding: '0',
    borderRadius: '12px',
    boxShadow: 'none',
    maxWidth: '680px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'hidden',
    inset: 'unset',
    zIndex: 10000,
    position: 'relative',
    border: 'none',
  },
};

const ModalEdicaoProduto = ({ isOpen, onClose, item, onSubmit }) => {
  if (!isOpen || !item) return null;

  const initialValues = {
    id: item.id || '',
    imagemURL: item.imagemURL || '',
    nome: item.nome || '',
    descricao: item.descricao || '',
    quantidade: item.quantidade || 0,
    preco: item.preco || 0,
    fornecedor: item.fornecedor || '',
    dataEntrada: item.dataEntrada ? item.dataEntrada.slice(0, 10) : '',
  };

  const handleSubmit = async (formData) => {
    try {
      await apiCliente.put(`/Produto/${formData.id}`, formData);
      onClose(); // Fecha o modal e atualiza a listagem no componente pai
    } catch (error) {
      console.error('Erro ao editar produto:', error);
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
        {item && <FormularioProduto
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={onClose}
          modalTitle="Editar Produto"
        />}
      </div>
    </Modal>
  );
};

export default ModalEdicaoProduto;


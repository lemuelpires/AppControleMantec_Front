import React from 'react';
import Modal from 'react-modal';
import FormularioProduto from '../../../Forms/FormularioProduto';
import { Titulo } from './style';

// Definir as classes do Modal
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

const ModalNovoProduto = ({ isOpen, onClose, onSubmit }) => {
  const initialValues = {
    nome: '',
    descricao: '',
    quantidade: 0,
    preco: 0,
    fornecedor: '',
    dataEntrada: '',
    imagemURL: '',
    ativo: true,
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
      <FormularioProduto 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        onClose={onClose}
        modalTitle="Adicionar Produto"
      />
    </Modal>
  );
};

export default ModalNovoProduto;


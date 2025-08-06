import React from 'react';
import Modal from 'react-modal';
import FormularioServico from '../../../Forms/FormularioServico';
import { Titulo } from './style';

// Definir as classes do Modal
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

const ModalNovoServico = ({ isOpen, onClose, onSubmit }) => {
  const initialValues = {
    id: '',
    nome: '',
    descricao: '',
    preco: 0,
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
      <FormularioServico 
        title="Novo Serviço"
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        onClose={onClose} 
      />
    </Modal>
  );
};

export default ModalNovoServico;


// src/components/Modais/ModalNovo.js
import React from 'react';
import Modal from 'react-modal';
import FormularioCliente from '../../../Forms/FormularioCliente';
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
    padding: '0',
    borderRadius: '12px',
    boxShadow: 'none',
    maxWidth: '680px',
    width: '80%',
    maxHeight: '75vh',
    overflow: 'hidden',
    inset: 'unset',
    zIndex: 10000,
    position: 'relative',
    border: 'none',
  },
};

const ModalNovo = ({ isOpen, onClose, onSubmit }) => {
  const initialValues = {
    nome: '',
    endereco: '',
    telefone: '',
    email: ''
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <FormularioCliente title="Novo Cliente" initialValues={initialValues} onSubmit={onSubmit} onClose={onClose} />
      </div>
    </Modal>
  );
};

export default ModalNovo;

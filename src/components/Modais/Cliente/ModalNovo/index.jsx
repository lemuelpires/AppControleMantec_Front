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
      <Titulo>
          <h2>Adicionar Cliente</h2>
      </Titulo>
      
      <FormularioCliente initialValues={initialValues} onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
};

export default ModalNovo;

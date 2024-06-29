// src/components/Modais/ModalEdicao.js
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
    backgroundColor: '#0b0b0b',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    inset: 'unset',
  },
};

const ModalEdicao = ({ isOpen, onClose, item, onSubmit }) => {
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
          <h2>Editar Cliente</h2>
      </Titulo>
      {item && <FormularioCliente initialValues={item} onSubmit={onSubmit} onClose={onClose} />}
    </Modal>
  );
};

export default ModalEdicao;

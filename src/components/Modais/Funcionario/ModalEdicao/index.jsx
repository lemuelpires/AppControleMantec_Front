import React from 'react';
import Modal from 'react-modal';
import FormularioFuncionario from '../../../Forms/FormularioFuncionario';
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

const ModalEdicaoFuncionario = ({ isOpen, onClose, item, onSubmit }) => {
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
      style = {modalStyles}
    >
      <Titulo>
        <h2>Editar Funcionário</h2>
      </Titulo>
      {item && <FormularioFuncionario initialValues={item} onSubmit={onSubmit} onClose={onClose} />}
    </Modal>
  );
};

export default ModalEdicaoFuncionario;

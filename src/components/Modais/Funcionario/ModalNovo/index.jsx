import React from 'react';
import Modal from 'react-modal';
import FormularioFuncionario from '../../../Forms/FormularioFuncionario';

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
    padding: '1rem',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    maxWidth: '650px',
    width: '95%',
    maxHeight: '90vh',
    inset: 'unset',
    zIndex: 10000,
    position: 'relative',
    overflow: 'visible',
  },
};

const ModalNovoFuncionario = ({ isOpen, onClose, onSubmit }) => {
  const initialValues = {
    nome: '',
    cargo: '',
    telefone: '',
    email: '',
    dataContratacao: '',
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
        <FormularioFuncionario
          title="Nova Funcionário"
          initialValues={initialValues}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

export default ModalNovoFuncionario;


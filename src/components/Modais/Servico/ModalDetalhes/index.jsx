import React from 'react';
import Modal from 'react-modal';
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

const ModalDetalhesServico = ({ isOpen, onClose, item }) => {
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
      <div>
        <Titulo>
          <h2>Detalhes do Serviço</h2>
        </Titulo>
        {item ? (
          Object.keys(item).map((key) => (
            <div key={key}>
              <strong>{key}:</strong> {item[key]}
            </div>
          ))
        ) : (
          <p>Serviço não encontrado.</p>
        )}
      </div>
    </Modal>
  );
};

export default ModalDetalhesServico;

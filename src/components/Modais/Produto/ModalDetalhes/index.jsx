import React from 'react';
import Modal from 'react-modal';
import { Titulo, Container } from './style';
import { format } from 'date-fns';

// Definir as classes do Modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
    width: '50%',
    inset: 'unset',
    color: '#ffffff',
  },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
};

const ModalDetalhesProduto = ({ isOpen, onClose, item }) => {
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
      <div>
        <Titulo>
          <h2>Detalhes do Produto</h2>
        </Titulo>
        {item ? (
          <Container>
            {Object.keys(item).map((key) => (
              key !== 'ativo' && key !== 'imagemURL' && (
                <div key={key}>
                  <strong>{key}:</strong> 
                  {key.toLowerCase().includes('data') ? (
                    formatDate(item[key])
                  ) : (
                    item[key]
                  )}
                </div>
              )
            ))}
            {item.imagemURL && (
              <div className="image-container">
                <img src={item.imagemURL} alt="Imagem do Produto" />
              </div>
            )}
          </Container>
        ) : (
          <p>Produto não encontrado.</p>
        )}
      </div>
    </Modal>
  );
};

export default ModalDetalhesProduto;

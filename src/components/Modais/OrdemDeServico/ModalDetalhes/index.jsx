import React from 'react';
import Modal from 'react-modal';
import { Titulo, Container } from './style';
import OrdemDeServicoReport from '../RelatorioImpressao'; // Certifique-se de ajustar o caminho para onde o componente está localizado

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#1f1e1e',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '90%',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    inset: 'unset',
    color: '#ffffff',
  },
};

const ModalDetalhesOrdemDeServico = ({ isOpen, onClose, item }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayElement={(props, contentElement) => (
        <div {...props}>{contentElement}</div>
      )}
      contentElement={(props, children) => (
        <div {...props} className="ordem-servico-modal-content">{children}</div>
      )}
      style={modalStyles}
    >
      <Container className="ordem-servico-modal-container">
        <Titulo className="ordem-servico-modal-titulo">
          <h2>Detalhes da Ordem de Serviço</h2>
        </Titulo>
        {item ? (
          <div className="ordem-servico-report-wrapper">
            <OrdemDeServicoReport ordemDeServico={item} onClose={onClose} />
          </div>
        ) : (
          <p className="ordem-servico-not-found">Ordem de serviço não encontrada.</p>
        )}
      </Container>
    </Modal>
  );
};

export default ModalDetalhesOrdemDeServico;

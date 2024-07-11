import React from 'react';
import Modal from 'react-modal';
import { Titulo, Container } from './style';
import OrdemDeServicoReport from '../RelatorioImpressao'; // Certifique-se de ajustar o caminho para onde o componente está localizado

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
    maxWidth: '90%', // Ajuste a largura máxima para 90%
    width: '90%',
    maxHeight: '90vh', // Ajuste a altura máxima para 90% da viewport
    overflowY: 'auto', // Adicione rolagem vertical
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
        <div {...props}>{children}</div>
      )}
      style={modalStyles}
    >
      <Container>
        <Titulo>
          <h2>Detalhes da Ordem de Serviço</h2>
        </Titulo>
        {item ? (
          <OrdemDeServicoReport ordemDeServico={item} onClose={onClose} />
        ) : (
          <p>Ordem de serviço não encontrada.</p>
        )}
      </Container>
    </Modal>
  );
};

export default ModalDetalhesOrdemDeServico;

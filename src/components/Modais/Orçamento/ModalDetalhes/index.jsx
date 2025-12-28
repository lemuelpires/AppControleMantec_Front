import React from 'react';
import Modal from 'react-modal';
import { Container } from './style';
import RelatorioImpressaoOrcamento from '../Impressao/RelatorioImpressao';

const modalStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 9999,
	},
	content: {
		backgroundColor: 'white',
		padding: '0',
		borderRadius: '12px',
		boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
		maxWidth: '850px',
		width: '95%',
		maxHeight: '95vh',
		overflowY: 'auto',
		inset: 'auto',
		position: 'relative',
	},
};

const ModalDetalhesOrcamento = ({ isOpen, onClose, item, cliente, produtos, servicos }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Detalhes do Orçamento"
    >
      {item ? (
        <RelatorioImpressaoOrcamento 
          orcamento={item} 
          cliente={cliente}
          produtos={produtos}
          servicos={servicos}
          onClose={onClose} 
        />
      ) : (
        <Container style={{padding: '2rem', textAlign: 'center'}}>
          <p>Orçamento não encontrado.</p>
        </Container>
      )}
    </Modal>
  );
};

export default ModalDetalhesOrcamento;

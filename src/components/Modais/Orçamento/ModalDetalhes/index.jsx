import React from 'react';
import Modal from 'react-modal';
import { Titulo, Container } from './style';
import RelatorioImpressaoOrcamento from '../Impressao/RelatorioImpressao';

// Estilos para impressão e barra de rolagem
const printStyles = `
	@media print {
		.ReactModal__Overlay,
		.ReactModal__Content,
		.orcamento-modal-container,
		.orcamento-report-wrapper {
			position: static !important;
			z-index: auto !important;
			background: white !important;
			color: #000 !important;
			margin: 0 !important;
			padding: 0 !important;
			border: none !important;
			box-shadow: none !important;
			border-radius: 0 !important;
			max-width: none !important;
			width: 100% !important;
			height: auto !important;
			max-height: none !important;
			overflow: visible !important;
		}
		.ReactModal__Overlay {
			background: white !important;
		}
	}
	.ReactModal__Content::-webkit-scrollbar {
		width: 8px;
	}
	.ReactModal__Content::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.ReactModal__Content::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, rgba(0, 123, 255, 0.6) 0%, rgba(0, 123, 255, 0.8) 100%);
		border-radius: 10px;
		border: 2px solid transparent;
		background-clip: content-box;
	}
	.ReactModal__Content::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(180deg, rgba(0, 123, 255, 0.8) 0%, rgba(0, 123, 255, 1) 100%);
		background-clip: content-box;
	}
	.ReactModal__Content::-webkit-scrollbar-corner {
		background: transparent;
	}
`;

// Adiciona estilos de impressão ao documento
if (typeof document !== 'undefined') {
	const existingStyle = document.getElementById('orcamento-print-styles');
	if (!existingStyle) {
		const styleSheet = document.createElement('style');
		styleSheet.id = 'orcamento-print-styles';
		styleSheet.type = 'text/css';
		styleSheet.innerText = printStyles;
		document.head.appendChild(styleSheet);
	}
}

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
		backgroundColor: 'white',
		padding: '0',
		borderRadius: '12px',
		boxShadow: 'none',
		maxWidth: '95%',
		width: '95%',
		maxHeight: '95vh',
		overflowY: 'auto',
		overflowX: 'hidden',
		inset: 'unset',
		zIndex: 10000,
		position: 'relative',
		border: 'none',
		scrollbarWidth: 'thin',
		scrollbarColor: 'rgba(0, 123, 255, 0.5) rgba(255, 255, 255, 0.1)',
	},
};

function formatDateBr(dateStr) {
	if (!dateStr) return '--/--/----';
	const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (match) {
		const [, year, month, day] = match;
		return `${month}/${day}/${year}`;
	}
	const d = new Date(dateStr);
	if (isNaN(d.getTime())) return '--/--/----';
	return d.toLocaleDateString('pt-BR');
}


const ModalDetalhesOrcamento = ({ isOpen, onClose, item }) => {
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
      <div style={{
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%',
	minHeight: '100%',
	padding: '1rem 0'
      }}>
	<Container className="orcamento-modal-container">
	  <Titulo className="orcamento-modal-titulo">
	    <h2>Detalhes do Orçamento</h2>
	  </Titulo>
	  {item ? (
	    <div className="orcamento-report-wrapper">
	      <RelatorioImpressaoOrcamento orcamento={item} onClose={onClose} />
	    </div>
	  ) : (
	    <p className="orcamento-not-found">Orçamento não encontrado.</p>
	  )}
	</Container>
      </div>
    </Modal>
  );
};

export default ModalDetalhesOrcamento;

import React from 'react';
import Modal from 'react-modal';
import { Titulo, Container } from './style';
import OrdemDeServicoReport from '../RelatorioImpressao';

// Estilos para otimização de impressão
const printStyles = `
  @media print {
    .ReactModal__Overlay,
    .ReactModal__Content,
    .ordem-servico-modal-container,
    .ordem-servico-report-wrapper {
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

  /* Estilização elegante da barra de rolagem */
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

// Adicionar estilos de impressão ao documento
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('ordem-servico-print-styles');
  if (!existingStyle) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'ordem-servico-print-styles';
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
    // Estilização da barra de rolagem
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(0, 123, 255, 0.5) rgba(255, 255, 255, 0.1)',
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
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%',
        minHeight: '100%',
        padding: '1rem 0'
      }}>
        {item ? (
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 1rem'
          }}>
            <OrdemDeServicoReport ordemDeServico={item} onClose={onClose} />
          </div>
        ) : (
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textAlign: 'center',
            color: '#2c3e50',
            maxWidth: '400px',
            margin: 'auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 20%, rgba(0, 123, 255, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(40, 167, 69, 0.03) 0%, transparent 50%)
              `,
              borderRadius: '12px',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            <div style={{position: 'relative', zIndex: 1}}>
              <h2 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#2c3e50',
                letterSpacing: '-0.5px',
                position: 'relative'
              }}>
                Ordem de Serviço não encontrada
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #007bff, #28a745)',
                  borderRadius: '2px'
                }} />
              </h2>
              <p style={{color: '#6c757d', margin: '0'}}>
                Não foi possível carregar os detalhes desta ordem de serviço.
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalDetalhesOrdemDeServico;

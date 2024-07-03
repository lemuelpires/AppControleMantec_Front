import React, { useState } from 'react';
import Modal from 'react-modal';
import { Titulo, Button } from './style';
import OrdemDeServicoReport from '../../RelatorioImpressao';

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

const ModalDetalhesOrdemDeServico = ({ isOpen, onClose, item }) => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleOpenReport = () => {
    setIsReportOpen(true);
  };

  const handleCloseReport = () => {
    setIsReportOpen(false);
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
      <div>
        <Titulo>
          <h2>Detalhes da Ordem de Serviço</h2>
        </Titulo>
        {item ? (
          Object.keys(item).map((key) => (
            <div key={key}>
              <strong>{key}:</strong> {item[key]}
            </div>
          ))
        ) : (
          <p>Ordem de serviço não encontrada.</p>
        )}
        <Button onClick={handleOpenReport}>Imprimir</Button>
      </div>
      <Modal
        isOpen={isReportOpen}
        onRequestClose={handleCloseReport}
        overlayElement={(props, contentElement) => (
          <div {...props}>{contentElement}</div>
        )}
        contentElement={(props, children) => (
          <div {...props}>{children}</div>
        )}
        style={modalStyles}
      >
        <OrdemDeServicoReport ordemDeServico={item} onClose={handleCloseReport} />
      </Modal>
    </Modal>
  );
};

export default ModalDetalhesOrdemDeServico;

import React from 'react';
import Modal from 'react-modal';
import { ModalContainer, ModalTitle, DetailsList, DetailItem, DetailLabel, DetailValue, CloseButton } from './style';

// Definir as classes do Modal
const modalStyles = {
  overlay: {
    background: 'linear-gradient(135deg, rgba(240, 240, 245, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
    backdropFilter: 'blur(8px)',
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
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(200, 200, 220, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    padding: '0',
    maxWidth: '700px',
    width: '85%',
    maxHeight: '85vh',
    overflow: 'hidden',
    inset: 'unset',
    position: 'relative',
  },
};

const ModalDetalhesEstoque = ({ isOpen, onClose, item }) => {
  const formatLabel = (key) => {
    const labelMap = {
      id: 'ID',
      produtoID: 'ID do Produto',
      produto: 'Produto',
      quantidade: 'Quantidade',
      dataAtualizacao: 'Data de Atualização',
      dataCriacao: 'Data de Criação',
      funcionario: 'Funcionário Responsável',
      observacoes: 'Observações'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatValue = (key, value) => {
    if (!value) return 'Não informado';
    
    if (key === 'dataAtualizacao' || key === 'dataCriacao') {
      try {
        const date = new Date(value);
        return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      } catch {
        return value;
      }
    }
    
    if (key === 'quantidade') {
      return `${value} ${value === 1 ? 'unidade' : 'unidades'}`;
    }
    
    return value;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayElement={(props, contentElement) => (
        <div {...props}>{contentElement}</div>
      )}
      contentElement={(props, children) => (
        <div {...props} className="estoque-modal-content">{children}</div>
      )}
      style={modalStyles}
    >
      <ModalContainer className="estoque-modal-container">
        <ModalTitle className="estoque-modal-title">Detalhes da Entrada de Estoque</ModalTitle>
        
        {item ? (
          <DetailsList className="estoque-details-list">
            {Object.keys(item).map((key, index) => (
              key !== 'ativo' && (
                <DetailItem 
                  key={key} 
                  delay={`${(index + 1) * 0.1}s`}
                  className="estoque-detail-item"
                >
                  <DetailLabel className="estoque-detail-label">{formatLabel(key)}</DetailLabel>
                  <DetailValue className="estoque-detail-value">{formatValue(key, item[key])}</DetailValue>
                </DetailItem>
              )
            ))}
          </DetailsList>
        ) : (
          <div 
            className="estoque-not-found"
            style={{ 
              textAlign: 'center', 
              color: 'rgba(107, 114, 128, 0.7)', 
              fontSize: '0.9rem',
              padding: '1.5rem'
            }}
          >
            Entrada de estoque não encontrada.
          </div>
        )}

        <CloseButton 
          onClick={onClose}
          className="estoque-close-button"
        >
          Fechar
        </CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalDetalhesEstoque;

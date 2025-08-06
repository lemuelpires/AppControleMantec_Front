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

const ModalDetalhesServico = ({ isOpen, onClose, item }) => {
  const formatLabel = (key) => {
    const labelMap = {
      id: 'ID',
      nome: 'Nome',
      descricao: 'Descrição',
      preco: 'Preço',
      categoria: 'Categoria',
      duracao: 'Duração',
      dataAtualizacao: 'Última Atualização',
      dataCriacao: 'Data de Criação'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatValue = (key, value) => {
    if (!value) return '';
    
    if (key === 'dataAtualizacao' || key === 'dataCriacao') {
      try {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString('pt-BR');
        const formattedTime = date.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        return `📅 ${formattedDate} às ${formattedTime}`;
      } catch {
        return value;
      }
    }
    
    if (key === 'preco') return `💰 R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
    if (key === 'categoria') return `🏷️ ${value}`;
    if (key === 'duracao') return `⏱️ ${value}`;
    if (key === 'descricao') return `📝 ${value}`;
    if (key === 'nome') return `🛠️ ${value}`;
    if (key === 'id') return `🔢 ${value}`;
    
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
        <div {...props} className="servico-modal-content">{children}</div>
      )}
      style={modalStyles}
    >
      <ModalContainer className="servico-modal-container">
        <ModalTitle className="servico-modal-title">Detalhes do Serviço</ModalTitle>
        
        {item ? (
          <DetailsList className="servico-details-list">
            {Object.keys(item).map((key, index) => (
              key !== 'ativo' && (
                <DetailItem 
                  key={key} 
                  delay={`${(index + 1) * 0.1}s`}
                  className="servico-detail-item"
                >
                  <DetailLabel className="servico-detail-label">{formatLabel(key)}</DetailLabel>
                  <DetailValue className="servico-detail-value">{formatValue(key, item[key])}</DetailValue>
                </DetailItem>
              )
            ))}
          </DetailsList>
        ) : (
          <div 
            className="servico-not-found"
            style={{ 
              textAlign: 'center', 
              color: 'rgba(107, 114, 128, 0.7)', 
              fontSize: '0.9rem',
              padding: '1.5rem'
            }}
          >
            Serviço não encontrado.
          </div>
        )}

        <CloseButton 
          onClick={onClose}
          className="servico-close-button"
        >
          Fechar
        </CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalDetalhesServico;


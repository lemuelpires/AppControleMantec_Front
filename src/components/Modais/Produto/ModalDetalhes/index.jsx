import React from 'react';
import Modal from 'react-modal';
import { ModalContainer, ModalTitle, DetailsList, DetailItem, DetailLabel, DetailValue, CloseButton } from './style';
import { format } from 'date-fns';

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
    maxWidth: '750px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'hidden',
    inset: 'unset',
    position: 'relative',
  },
};

const ModalDetalhesProduto = ({ isOpen, onClose, item }) => {
  const formatLabel = (key) => {
    const labelMap = {
      id: 'ID',
      nome: 'Nome do Produto',
      descricao: 'Descrição',
      quantidade: 'Quantidade em Estoque',
      preco: 'Preço',
      fornecedor: 'Fornecedor',
      dataEntrada: 'Data de Entrada',
      imagemURL: 'Imagem',
      dataAtualizacao: 'Última Atualização',
      dataCriacao: 'Data de Criação'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatValue = (key, value) => {
    if (!value) return 'Não informado';
    
    if (key === 'dataEntrada' || key === 'dataAtualizacao' || key === 'dataCriacao') {
      try {
        const date = new Date(value);
        return `📅 ${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}`;
      } catch {
        return value;
      }
    }
    
    if (key === 'preco') {
      return `💰 ${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)}`;
    }

    if (key === 'quantidade') {
      return `📦 ${value} ${value === 1 ? 'unidade' : 'unidades'}`;
    }

    if (key === 'fornecedor') {
      return `🏢 ${value}`;
    }

    if (key === 'nome') {
      return `🏷️ ${value}`;
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
        <div {...props} className="produto-modal-content">{children}</div>
      )}
      style={modalStyles}
    >
      <ModalContainer className="produto-modal-container">
        <ModalTitle className="produto-modal-title">Detalhes do Produto</ModalTitle>
        
        {item ? (
          <DetailsList className="produto-details-list">
            {Object.keys(item).map((key, index) => (
              key !== 'ativo' && key !== 'imagemURL' && (
                <DetailItem 
                  key={key} 
                  delay={`${(index + 1) * 0.1}s`}
                  className="produto-detail-item"
                >
                  <DetailLabel className="produto-detail-label">{formatLabel(key)}</DetailLabel>
                  <DetailValue className="produto-detail-value">{formatValue(key, item[key])}</DetailValue>
                </DetailItem>
              )
            ))}
            
            {item.imagemURL && (
              <DetailItem 
                delay={`${(Object.keys(item).length + 1) * 0.1}s`} 
                className="produto-detail-item produto-image-item"
                style={{ gridColumn: '1 / -1' }}
              >
                <DetailLabel className="produto-detail-label">📸 Imagem do Produto</DetailLabel>
                <div className="produto-image-container" style={{ 
                  width: '100%', 
                  textAlign: 'center',
                  marginTop: '0.4rem',
                  paddingLeft: '0'
                }}>
                  <img 
                    src={item.imagemURL} 
                    alt="Produto" 
                    className="produto-image"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '120px',
                      borderRadius: '8px',
                      border: '1px solid rgba(200, 200, 220, 0.4)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </DetailItem>
            )}
          </DetailsList>
        ) : (
          <div 
            className="produto-not-found"
            style={{ 
              textAlign: 'center', 
              color: 'rgba(107, 114, 128, 0.7)', 
              fontSize: '0.9rem',
              padding: '1.5rem'
            }}
          >
            Produto não encontrado.
          </div>
        )}

        <CloseButton 
          onClick={onClose}
          className="produto-close-button"
        >
          Fechar
        </CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalDetalhesProduto;


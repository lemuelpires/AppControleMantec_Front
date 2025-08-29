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

const ModalDetalhes = ({ isOpen, onClose, item }) => {
  // Função auxiliar para formatar datas com hora sem deslocamento de fuso
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (match) {
      const [, year, month, day, hour, minute] = match;
      return `${day}/${month}/${year} ${hour}:${minute}`;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const datePart = d.toLocaleDateString('pt-BR');
    const timePart = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${datePart} ${timePart}`;
  };

  const formatLabel = (key) => {
    const labelMap = {
      id: 'ID',
      nome: 'Nome',
      email: 'E-mail',
      telefone: 'Telefone',
      endereco: 'Endereço',
      dataNascimento: 'Data de Nascimento',
      cpf: 'CPF',
      dataAtualizacao: 'Última Atualização',
      dataCriacao: 'Data de Criação'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatValue = (key, value) => {
    if (!value) return '';
    
    if (key === 'dataNascimento' || key === 'dataAtualizacao' || key === 'dataCriacao' || key === 'dataCadastro') {
      return `📅 ${formatDate(value)}`;  // Inclui data e hora
    }
    
    if (key === 'email') return `📧 ${value.toLowerCase()}`;
    if (key === 'telefone') return `📱 ${value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}`;
    if (key === 'cpf') return `🆔 ${value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}`;
    if (key === 'endereco') return `📍 ${value}`;
    if (key === 'nome') return `👤 ${value}`;
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
        <div {...props} className="cliente-modal-content">{children}</div>
      )}
      style={modalStyles}
    >
      <ModalContainer className="cliente-modal-container">
        <ModalTitle className="cliente-modal-title">Detalhes do Cliente</ModalTitle>
        
        {item ? (
          <DetailsList className="cliente-details-list">
            {Object.keys(item).map((key, index) => (
              key !== 'ativo' && (
                <DetailItem 
                  key={key} 
                  delay={`${(index + 1) * 0.1}s`}
                  className="cliente-detail-item"
                >
                  <DetailLabel className="cliente-detail-label">{formatLabel(key)}</DetailLabel>
                  <DetailValue className="cliente-detail-value">{formatValue(key, item[key])}</DetailValue>
                </DetailItem>
              )
            ))}
          </DetailsList>
        ) : (
          <div 
            className="cliente-not-found"
            style={{ 
              textAlign: 'center', 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: '0.9rem',
              padding: '1.5rem'
            }}
          >
            Cliente não encontrado.
          </div>
        )}

        <CloseButton 
          onClick={onClose}
          className="cliente-close-button"
        >
          Fechar
        </CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalDetalhes;

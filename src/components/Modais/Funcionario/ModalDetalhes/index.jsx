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

const ModalDetalhesFuncionario = ({ isOpen, onClose, item }) => {
  const formatLabel = (key) => {
    const labelMap = {
      id: 'ID',
      nome: 'Nome',
      email: 'E-mail',
      telefone: 'Telefone',
      endereco: 'Endereço',
      dataNascimento: 'Data de Nascimento',
      cpf: 'CPF',
      cargo: 'Cargo',
      salario: 'Salário',
      dataAdmissao: 'Data de Admissão',
      dataAtualizacao: 'Última Atualização',
      dataCriacao: 'Data de Criação'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatValue = (key, value) => {
    if (!value) return 'Não informado';
    
    if (key === 'dataNascimento' || key === 'dataAtualizacao' || key === 'dataCriacao' || key === 'dataAdmissao') {
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
    
    if (key === 'email') return value.toLowerCase();
    if (key === 'telefone') return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (key === 'cpf') return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    if (key === 'salario') return `R$ ${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    
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
        <div {...props} className="funcionario-modal-content">{children}</div>
      )}
      style={modalStyles}
    >
      <ModalContainer className="funcionario-modal-container">
        <ModalTitle className="funcionario-modal-title">Detalhes do Funcionário</ModalTitle>
        
        {item ? (
          <DetailsList className="funcionario-details-list">
            {Object.keys(item).map((key, index) => (
              key !== 'ativo' && (
                <DetailItem 
                  key={key} 
                  delay={`${(index + 1) * 0.1}s`}
                  className="funcionario-detail-item"
                >
                  <DetailLabel className="funcionario-detail-label">{formatLabel(key)}</DetailLabel>
                  <DetailValue className="funcionario-detail-value">{formatValue(key, item[key])}</DetailValue>
                </DetailItem>
              )
            ))}
          </DetailsList>
        ) : (
          <div 
            className="funcionario-not-found"
            style={{ 
              textAlign: 'center', 
              color: 'rgba(107, 114, 128, 0.7)', 
              fontSize: '0.9rem',
              padding: '1.5rem'
            }}
          >
            Funcionário não encontrado.
          </div>
        )}

        <CloseButton 
          onClick={onClose}
          className="funcionario-close-button"
        >
          Fechar
        </CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalDetalhesFuncionario;


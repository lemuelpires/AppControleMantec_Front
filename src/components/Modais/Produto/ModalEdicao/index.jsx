import React from 'react';
import Modal from 'react-modal';
import FormularioProduto from '../../../Forms/FormularioProduto';
import { ModalContainer, ModalContent, ModalTitle, ModalCloseButton } from './style';

const ModalEdicaoProduto = ({ isOpen, onClose, item, onSubmit }) => {
  if (!isOpen || !item) return null;

  const initialValues = {
    id: item.id || '',
    imagemURL: item.imagemURL || '',
    nome: item.nome || '',
    descricao: item.descricao || '',
    quantidade: item.quantidade || 0,
    preco: item.preco || 0,
    fornecedor: item.fornecedor || '',
    dataEntrada: item.dataEntrada ? item.dataEntrada.slice(0, 10) : '',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Produto"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          display: 'flex',
          justifyContent: 'center',
          border: 'none',
          backgroundColor: 'transparent',
          width: '100%',
          inset: 'unset',
          color: '#ffffff',
        },
      }}
    >
      <ModalContainer>
        <ModalTitle>Editar Produto</ModalTitle>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalContent>
          <FormularioProduto initialValues={initialValues} onSubmit={onSubmit} onClose={onClose} />
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default ModalEdicaoProduto;

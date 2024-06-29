import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
`;

const ModalDetalhes = ({ isOpen, onClose, item }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <DetailsContainer>
        <h2>Detalhes do Cliente</h2>
        {item ? (
          Object.keys(item).map((key) => (
            <DetailItem key={key}>
              <strong>{key}:</strong> {item[key]}
            </DetailItem>
          ))
        ) : (
          <p>Cliente não encontrado.</p>
        )}
      </DetailsContainer>
    </Modal>
  );
};

export default ModalDetalhes;

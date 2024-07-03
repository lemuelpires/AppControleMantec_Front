import styled from 'styled-components';

export const Titulo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

// Estilos para o ModalContainer e ModalContent se ainda não estiverem definidos:
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
`;

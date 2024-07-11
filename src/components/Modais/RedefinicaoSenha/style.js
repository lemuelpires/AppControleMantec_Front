import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
`;

export const ModalContent = styled.div`
  background-color: #2b2929;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
`;

export const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 24px;

  &:hover,
  &:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const ResetForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

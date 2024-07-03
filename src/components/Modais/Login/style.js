// ModalLogin.styles.js
import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 0, 0);
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #151617;
  padding: 20px;
  width: 40%;
  height: auto;
  border-radius: 8px;
  color: #d9d9d9;
`;


export const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 4em;
  margin-bottom: 4em;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column; 
  padding: 1em;
`;

export const Input = styled.input`
    width:100%;
    height:2em;
    margin-bottom: 1em;
    padding: 0 0.5em;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom:1em;
    gap: 0.5em;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 1em;
`;

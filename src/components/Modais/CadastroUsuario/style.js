// style.js (arquivo onde você define os estilos dos modais)
import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.9);
`;

export const ModalContent = styled.div`
  background-color: #2b2b2b;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  border-radius: 5px;
`;

export const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  &:hover,
  &:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const FormGroup = styled.div`
  display:flex;
  flex-direction: column;
  align-items: left;
`;

export const Label = styled.label`
  font-weight: bold;
  text-align:left;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%;
  height: 2em;
  margin-bottom: 2em;

  option{
    background-color: #5d5d5f;
  }
`;

// Estilize conforme necessário para ajustar ao design do seu aplicativo

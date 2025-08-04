import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px 0 8px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 98%;
`;

export const EspacamentoButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

export const Button = styled.button`
   padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  font-size: 1rem;

  &.save {
    background-color: #0d9f2e;
    color: white;
  }

  &.cancel {
    background-color: #c7382d;
    color: white;
  }

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }
`;

export const Espacamento = styled.div`
  display:flex;
  flex-direction: column;
`;
export const EspacamentoContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-itens:center;
  gap:4em;
`;

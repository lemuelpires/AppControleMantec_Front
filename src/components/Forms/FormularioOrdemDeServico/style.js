import styled from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20em;
    height: 1.5em;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Titulo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: white;
  h2 {
    margin: 0;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

export const Espacamento = styled.div`
  display:flex;
  flex-direction: column;
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
justify-content: center;
`;

export const Container = styled.div`
display:flex;
  flex-direction: row;
  justify-content: center;
  align-itens:center;
`;

export const EspacamentoButton = styled.div`
display: flex;
justify-content: center;
gap: 3em;
`;

export const EspacamentoContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-itens:center;
  gap:4em;
`;
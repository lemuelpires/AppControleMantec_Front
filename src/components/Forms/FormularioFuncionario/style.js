import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px 0 8px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px;
  margin-top: 10px;

`;

export const BotaoEspacamento = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

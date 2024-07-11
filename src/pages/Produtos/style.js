import styled from 'styled-components';

export const ProdutoContainer = styled.div`
  padding: 20px;
  min-height: 77.8vh;
  background-color: #242424;
`;

export const ProdutoTitle = styled.h2`
  margin-bottom: 20px;
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

export const ProdutoButton = styled.button`
    flex-direction: column;
    margin-right: 5px;
    padding: 5px 10px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056c8;
    }
`;

export const ProdutoTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #141516;
  }

  tr:hover {
    background-color: #3c3c3c;
  }

  button {
    flex-direction: column;
    margin-right: 5px;
    padding: 5px 10px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056c8;
    }
  }
`;

export const Form = styled.form`
`;

export const FormGroup = styled.form`
`;

export const Input = styled.input`
`;

export const Label = styled.input`
`;
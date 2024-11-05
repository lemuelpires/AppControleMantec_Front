import styled from 'styled-components';

export const FuncionariosContainer = styled.div`
  padding: 20px;
  min-height: 77.8vh;
`;

export const FuncionariosTitle = styled.h2`
  margin-bottom: 20px;
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

export const FuncionariosButton = styled.button`
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

export const FuncionariosTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #141516;
  }
  tr:hover {
    background-color: #3c3c3c;
  }

  button {
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

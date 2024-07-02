import styled from 'styled-components';

export const ServicoContainer = styled.div`
  padding: 20px;
`;

export const ServicoTitle = styled.h1`
  margin-bottom: 20px;
`;

export const ServicoButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ServicoTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #141516;
  }

  tr:hover {
    background-color: #141516;
  }
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

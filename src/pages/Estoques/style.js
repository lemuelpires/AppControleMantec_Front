import styled from 'styled-components';

export const EstoqueContainer = styled.div`
  padding: 20px;
  min-height: 77.8vh;
`;

export const EstoqueTitle = styled.h2`
  margin-bottom: 20px;
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

export const EstoqueButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const EstoqueTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }
`;

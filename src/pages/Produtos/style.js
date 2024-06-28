// src/styles/ProdutoStyles.js
import styled from 'styled-components';

export const ProdutoContainer = styled.div`
  padding: 20px;
`;

export const ProdutoTitle = styled.h2`
  margin-bottom: 20px;
`;

export const ProdutoButton = styled.button`
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

export const ProdutoTable = styled.table`
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

  tr:hover {
    background-color: #f5f5f5;
  }

  button {
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
`;

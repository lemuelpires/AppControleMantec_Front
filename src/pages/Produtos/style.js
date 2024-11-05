import styled from 'styled-components';

export const ProdutoContainer = styled.div`
  padding: 20px;
  min-height: 77.8vh;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const ProdutoTitle = styled.h2`
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 1.5em;
  }
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;

  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 0.5em;
  }
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

  @media (max-width: 600px) {
    width: 100%;
    margin: 5px 0;
    padding: 10px;
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

  @media (max-width: 600px) {
    display: block; /* Alterando para bloco para permitir rolagem */
    overflow-x: auto; /* Ativando rolagem horizontal */
    width: 100%; /* Garantindo que ocupe 100% da largura */
  }
`;

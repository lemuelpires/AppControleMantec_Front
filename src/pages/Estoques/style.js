import styled from 'styled-components';

export const EstoqueContainer = styled.div`
  padding: 0 4em;
  min-height: 77.8vh;
`;

export const EstoqueTitle = styled.h2`
  margin-bottom: 20px;
  color: #d9d9d9;
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

export const EstoqueButton = styled.button`
  flex-direction: column;
  background-color: rgb(109, 165, 18); /* Cor de fundo do botão */
  padding: 5px 8px;
  color: white;
  border: solid 1px rgba(228, 252, 11, 0.51); /* Borda do botão */
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease; /* Transição suave para todos os estilos do botão */

  &:hover {
    background-color: rgb(114, 167, 97);
  }

  @media (max-width: 600px) {
    margin: 5px 0;
  }
`;

export const EstoqueTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #333;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #2e3b4e;
    color: white;
  }

  tr:nth-child(odd) {
    background-color: white;
  }

  tr:nth-child(even) {
    background-color: #f0f8ff;
  }

  tr:hover {
    background-color: #cce7ff;
  }

  i {
    margin-right: 10px;
    cursor: pointer;
    color: rgb(32, 32, 32);
    transition: color 0.3s ease;

    &:hover {
      color: rgb(114, 167, 97);
    }
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

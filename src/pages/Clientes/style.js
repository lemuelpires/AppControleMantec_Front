import styled from 'styled-components';

export const ClientesContainer = styled.div`
  padding: 0 8em;
  padding-bottom: 5em;
  min-height: 77.8vh;
  transition: padding 0.3s ease, min-height 0.3s ease;

  @media (max-width: 800px) {
    padding: 0 5em;
  }

  @media (max-width: 600px) {
    padding: 2em;
  }

  @media (max-width: 550px) {
    padding: 0.8em;
  }

  @media (max-width: 450px) {
    padding: 0.5em;
  }
`;

export const ClientesTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 2em;

  @media (max-width: 600px) {
    font-size: 1.5em;
  }

  @media (max-width: 550px) {
    font-size: 0.5em;
  }

  @media (max-width: 450px) {
    font-size: 0.4em;
  }
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;
  transition: margin-bottom 0.3s ease;

  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 0.5em;
  }

  @media (max-width: 550px) {
    margin-bottom: 0.3em;
  }

  @media (max-width: 450px) {
    margin-bottom: 0.2em;
  }
`;

export const ClientesButton = styled.button`
  flex-direction: column;
  margin-right: 5px;
  padding: 5px 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056c8;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 5px 0;
    padding: 10px;
  }

  @media (max-width: 550px) {
    padding: 8px;
  }

  @media (max-width: 450px) {
    padding: 6px;
  }
`;

export const ClientesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  transition: transform 0.3s ease;

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    color: black;
    transition: padding 0.3s ease;
  }

  th {
    background-color: #2e3b4e;
    color: black;
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

  th:nth-child(3),
  td:nth-child(3) {
    display: none;
  }

  @media (max-width: 880px) {
    display: block;
    overflow-x: auto;
    width: 100%;

    th:nth-child(6),
    td:nth-child(6),
    th:nth-child(7),
    td:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 750px) {
    table {
      width: 100%;
    }

    table:not(:root) {
      transform: scale(0.5);
      transform-origin: top center;
    }
  }

  @media (max-width: 600px) {
    table {
      transform: scale(0.8);
    }
  }

  @media (max-width: 550px) {
    table {
      transform: scale(0.4);
    }
  }

  @media (max-width: 450px) {
    table {
      transform: scale(0.3);
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

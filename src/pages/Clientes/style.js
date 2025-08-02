
import styled from 'styled-components';

export const ClientesContainer = styled.div`
  padding: 0 4em;
  padding-bottom: 5em;
  min-height: 77.8vh;
  transition: padding 0.3s ease, min-height 0.3s ease;

  @media (max-width: 800px) {
    padding: 0 2em;
  }

  @media (max-width: 600px) {
    padding: 1em;
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
    font-size: 1.2em;
  }

  @media (max-width: 450px) {
    font-size: 1em;
  }
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const ClientesButton = styled.button`
  margin-right: 5px;
  background-color: rgb(109, 165, 18);
  padding: 5px 9px;
  color: white;
  border: solid 1px rgba(228, 252, 11, 0.51);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(114, 167, 97);
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 5px 0;
    padding: 10px;
  }
`;

export const ClientesTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ClientesTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    color: black;
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

  @media (max-width: 750px) {
    th,
    td {
      font-size: 0.85em;
      padding: 6px;
    }
  }

  @media (max-width: 550px) {
    th,
    td {
      font-size: 0.75em;
      padding: 4px;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  color: rgb(37, 37, 37);
  cursor: pointer;
`;

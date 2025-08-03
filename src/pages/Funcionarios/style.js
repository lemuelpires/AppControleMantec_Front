import styled from 'styled-components';

export const FuncionariosContainer = styled.div`
  padding: 0 4em;
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

export const FuncionariosTitle = styled.h2`
  margin-bottom: 0px;
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

export const FuncionariosButton = styled.button`
  flex-direction: column;
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

  @media (max-width: 550px) {
    padding: 8px;
  }

  @media (max-width: 450px) {
    padding: 6px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: rgb(37, 37, 37);
  gap: 10px;

  svg {
    font-size: 1em;
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
      transform: scale(1);
      color: #007bff;
    }
  }

  @media (max-width: 550px) {
    flex-wrap: wrap;
    font-size: 0.7em;

    &:hover {
      transform: scale(0.7);
      color: #007bff;
    }
  }

  @media (max-width: 450px) {
    font-size: 0.6em;
  }
`;

export const FuncionariosTable = styled.table`
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

  @media (max-width: 880px) {
    display: block;
    overflow-x: auto;
    width: 100%;
  }
`;

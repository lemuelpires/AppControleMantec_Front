import styled from 'styled-components';

export const ProdutoContainer = styled.div`
  padding: 0 8em;
  padding-bottom: 5em;
  min-height: 77.8vh;
  transition: padding 0.3s ease, min-height 0.3s ease; /* Transição suave para o ajuste de padding e min-height */

  @media (max-width: 800px) {
    padding: 0 5em; /* Ajuste de padding para telas médias */
  }

  @media (max-width: 600px) {
    padding: 2em; /* Reduzindo o padding para telas pequenas */
  }

  @media (max-width: 550px) {
    padding: 0.8em; /* Ajuste de padding adicional para telas muito pequenas */
  }

  @media (max-width: 450px) {
    padding: 0.5em; /* Ajuste de padding para telas menores que 450px */
  }
`;

export const ProdutoTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 2em; /* Tamanho de fonte padrão */

  @media (max-width: 600px) {
    font-size: 1.5em; /* Tamanho de fonte para telas pequenas */
  }

  @media (max-width: 550px) {
    font-size: 0.5em; /* Tamanho de fonte ainda menor para telas muito pequenas */
  }

  @media (max-width: 450px) {
    font-size: 0.4em; /* Tamanho de fonte ainda menor para telas menores que 450px */
  }
`;

export const BotaoEspacamento = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1em;
  transition: margin-bottom 0.3s ease; /* Transição suave para margem inferior */

  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 0.5em;
  }

  @media (max-width: 550px) {
    margin-bottom: 0.3em; /* Ajuste de margem para telas pequenas */
  }

  @media (max-width: 450px) {
    margin-bottom: 0.2em; /* Ajuste de margem para telas menores que 450px */
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
  transition: all 0.3s ease; /* Transição suave para todos os estilos do botão */

  &:hover {
    background-color: #0056c8;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 5px 0;
    padding: 10px;
  }

  @media (max-width: 550px) {
    padding: 8px; /* Ajuste do padding em telas muito pequenas */
  }

  @media (max-width: 450px) {
    padding: 6px; /* Ajuste de padding para telas menores que 450px */
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg {
    font-size: 1.2em;
    transition: transform 0.3s ease, color 0.3s ease; /* Transição suave para transformação e cor */

    &:hover {
      transform: scale(1.2);
      color: #007bff; /* Cor de destaque no hover */
    }
  }

  @media (max-width: 550px) {
    flex-wrap: wrap; /* Quebra de linha para telas muito pequenas */
    font-size: 0.8em;
    transition: transform 0.3s ease, color 0.3s ease; /* Transição suave para transformação e cor */

    &:hover {
      transform: scale(0.8);
      color: #007bff; /* Cor de destaque no hover */
    }
  }

  @media (max-width: 450px) {
    font-size: 0.7em; /* Tamanho de fonte reduzido para telas menores que 450px */
  }
`;

export const ProdutoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  transition: transform 0.3s ease; /* Transição suave para transformações da tabela */

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    color: black; /* Cor do texto preta */
    transition: padding 0.3s ease; /* Transição suave para o padding das células */
  }

  th {
    background-color: #2e3b4e; /* Tom mais escuro para o cabeçalho */
    color: black; /* Letras pretas, mas visíveis */
  }

  tr:nth-child(odd) {
    background-color: white; /* Fundo branco para linhas ímpares */
  }

  tr:nth-child(even) {
    background-color: #f0f8ff; /* Fundo azul clarinho para linhas pares */
  }

  tr:hover {
    background-color: #cce7ff; /* Cor de destaque ao passar o mouse */
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
    display: none; /* Ocultando a coluna Descrição em todos os tamanhos de tela */
  }

  @media (max-width: 880px) {
    display: block; /* Alterando para bloco para permitir rolagem */
    overflow-x: auto; /* Ativando rolagem horizontal */
    width: 100%; /* Garantindo que ocupe 100% da largura */

    th:nth-child(6),
    td:nth-child(6),
    th:nth-child(7),
    td:nth-child(7) {
      display: none; /* Ocultando Fornecedor e Data de Entrada em telas menores */
    }
  }

  @media (max-width: 750px) {
    table {
      width: 100%; /* Garantindo que a tabela tenha 100% da largura */
    }

    table:not(:root) {
      transform: scale(0.5); /* Reduzindo a escala dos elementos internos da tabela */
      transform-origin: top center; /* Garantindo que a redução seja feita do topo da tabela */
    }
  }

  @media (max-width: 600px) {
    table {
      transform: scale(0.8); /* Reduzindo a escala em telas pequenas */
    }
  }

  @media (max-width: 550px) {
    table {
      transform: scale(0.4); /* Mais redução em telas muito pequenas */
    }
  }

  @media (max-width: 450px) {
    table {
      transform: scale(0.3); /* Maior redução em telas menores que 450px */
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Definindo 2 colunas */
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa; /* Fundo mais suave */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas para tablets */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 coluna em telas menores que 768px */
    padding: 3em; /* Reduzindo o padding em telas menores */
  }
`;

export const Service = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 20px;
    margin: 10px 0;
    color: #333;
  }

  p {
    color: #555;
    font-size: 16px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 15px; /* Reduzindo o padding em telas menores */
    h2 {
      font-size: 18px; /* Diminuindo o tamanho da fonte do título */
    }

    p {
      font-size: 14px; /* Diminuindo o tamanho da fonte da descrição */
    }
  }
`;

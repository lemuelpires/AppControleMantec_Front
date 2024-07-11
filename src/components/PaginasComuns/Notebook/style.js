import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* Definindo 2 colunas */
  gap: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Service = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    color: #555;
    font-size: 16px;
    line-height: 1.5;
  }
`;

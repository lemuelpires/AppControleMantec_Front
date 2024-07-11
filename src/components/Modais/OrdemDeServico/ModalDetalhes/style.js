import styled from 'styled-components';

export const Titulo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;

  h2 {
    color: #f1f1f1;
    font-size: 1.5rem;
    border-bottom: 2px solid #f1f1f1;
    padding-bottom: 5px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f1f1f1;
  width: 100%;

  p {
    text-align: center;
  }
`;

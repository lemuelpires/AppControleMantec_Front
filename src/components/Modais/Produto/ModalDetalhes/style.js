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

  div {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  strong {
    margin-right: 5px;
    color: #ff7f50;
  }

  .image-container {
    margin-top: 20px;
    img {
      max-width: 30%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(255, 127, 80, 0.5);
    }
  }
`;

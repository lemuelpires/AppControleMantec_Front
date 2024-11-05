import styled from 'styled-components';

export const ModalTitle = styled.div`
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

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #f1f1f1;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff7f50;
  }
`;

export const ModalContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    label {
      color: #f1f1f1;
      margin-bottom: 10px;
      width:50%;
    }

    input, textarea, select {
      width: 80%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #444;
      border-radius: 4px;
      background-color: #333;
      color: #f1f1f1;
    }

    button {
      width: 50%;
      padding: 10px;
      margin-top: 10px;
      border: none;
      border-radius: 4px;
      background-color: #ff7f50;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #ff4500;
      }
    }
  }
`;

export const ModalContainer = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 8px;
  background-color: #2e2e2e;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 600px;
  color: #f1f1f1;
`;

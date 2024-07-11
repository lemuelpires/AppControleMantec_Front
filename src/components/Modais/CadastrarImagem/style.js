import styled from 'styled-components';
import Modal from 'react-modal';

export const StyledModal = styled(Modal)`
  &.ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.ReactModal__Content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
    text-align:center;
    background-color: #1f1e1e;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    inset: unset;
    margin: auto;
    margin-top: 3em;
  }
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #333;
  color: #fff;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 5px 0 0;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  &:last-child {
    background-color: #f44336;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin: 10px 0;
  transition: margin-top 0.5s ease-in-out;
  margin-top: ${props => props.src ? '20px' : '0'};
`;

export const ProgressBar = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 4px;
  margin: 10px 0;
  
  &:before {
    content: '';
    display: block;
    height: 10px;
    width: ${props => props.progress}%;
    background-color: #4caf50;
    border-radius: 4px;
  }
`;

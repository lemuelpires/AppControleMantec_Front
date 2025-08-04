import styled from 'styled-components';

export const Campo = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   margin-bottom:1em;
`;

  export const Input = styled.input`
    width: 350px;
`;

export const EspacamentoButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

export const Button = styled.button`
   padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  font-size: 1rem;

  &.save {
    background-color: #0d9f2e;
    color: white;
  }

  &.cancel {
    background-color: #c7382d;
    color: white;
  }

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }
`;


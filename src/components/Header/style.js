// style.js
import styled, { css } from 'styled-components'; // Importe 'css' do styled-components
import { Link } from 'react-router-dom';

export const HeaderStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
`;

export const HeaderContainer = styled.header`
  ${HeaderStyles}; /* Aplica os estilos importados */
`;

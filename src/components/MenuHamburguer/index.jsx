// Menu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 0;
`;

const MenuItem = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Menu = () => {
  return (
    <MenuContainer>
      <MenuItem to="/clientes">Clientes</MenuItem>
      <MenuItem to="/produtos">Produtos</MenuItem>
      <MenuItem to="/estoque">Estoque</MenuItem>
      <MenuItem to="/funcionarios">Funcionários</MenuItem>
      <MenuItem to="/ordem-de-servico">Ordens de Serviço</MenuItem>
      <MenuItem to="/servicos">Serviços</MenuItem>
    </MenuContainer>
  );
};

export default Menu;

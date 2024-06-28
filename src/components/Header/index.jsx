// Menu.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa'; // Importa o ícone do menu hamburguer

const MenuContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuIcon = styled.div`
  cursor: pointer;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
`;

const MenuItem = styled.li`
  padding: 10px;
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContainer>
      <MenuHeader>
        <h2>Menu</h2>
        <MenuIcon onClick={toggleMenu}>
          <FaBars />
        </MenuIcon>
      </MenuHeader>
      <MenuList open={isOpen}>
        <MenuItem>
          <MenuLink to="/clientes" onClick={toggleMenu}>
            Clientes
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/produtos" onClick={toggleMenu}>
            Produtos
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/estoque" onClick={toggleMenu}>
            Estoque
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/funcionarios" onClick={toggleMenu}>
            Funcionários
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/ordem-de-servico" onClick={toggleMenu}>
            Ordens de Serviço
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/servicos" onClick={toggleMenu}>
            Serviços
          </MenuLink>
        </MenuItem>
      </MenuList>
    </MenuContainer>
  );
};

export default Menu;

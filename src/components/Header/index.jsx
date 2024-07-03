import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import ModalLogin from '../Modais/Login';
import useAuthentication from '../../hooks/userAuthentication';

const MenuContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const Espacamento = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 1em;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuIcon = styled.div`
  cursor: pointer;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;

  ul{
    list-style-type: none;
    padding: 0;
  }
`;

const MenuItem = styled.li`
  padding: 10px 0;
  &:hover {
    background-color: #444;
  }
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: none;
  }
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { loading, error, logout, auth } = useAuthentication(); // Use seu hook de autenticação

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = async () => {
    await logout(); // Chama a função de logout do hook de autenticação
    setIsOpen(false); // Fecha o menu ao fazer logout
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Fecha o menu quando o mouse sai do menu
  };

  return (
    <MenuContainer>
      <MenuHeader>
        <h2>Menu</h2>
        <Espacamento>
          <MenuIcon onClick={toggleMenu}>
            <FaBars />
          </MenuIcon>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Erro ao carregar dados de usuário</p>
          ) : (
            <>
              {auth.currentUser ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button onClick={toggleLoginModal}>Login</button>
              )}
              <ModalLogin isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
            </>
          )}
        </Espacamento>
      </MenuHeader>
      <Sidebar open={isOpen} onMouseLeave={handleMouseLeave}>
        <ul>
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
        </ul>
      </Sidebar>
    </MenuContainer>
  );
};

export default Menu;

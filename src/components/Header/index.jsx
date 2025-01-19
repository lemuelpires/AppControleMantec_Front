import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaBars, FaSignInAlt, FaUser } from 'react-icons/fa';
import ModalLogin from '../Modais/Login';
import useAuthentication from '../../hooks/userAuthentication';
import ModalCadastroUsuario from '../Modais/CadastroUsuario'; // Importa o modal de cadastro de usuário
import logo from '../../assets/icone.png'; // Importa a logo da empresa
import {
  MenuContainer,
  Espacamento,
  MenuHeader,
  MenuIcon,
  Sidebar,
  MenuItem,
  MenuLink,
  UserMenu,
  UserMenuItem,
} from './style'; // Importa estilos do arquivo styles.js

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCadastroUsuarioOpen, setIsCadastroUsuarioOpen] = useState(false); // Estado para controlar se o modal de cadastro de usuário está aberto
  const { loading, error, logout, auth } = useAuthentication(); // Use seu hook de autenticação

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navigate = useNavigate();

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = async () => {
    await logout(); // Chama a função de logout do hook de autenticação
    setIsOpen(false); // Fecha o menu ao fazer logout
    setIsUserMenuOpen(false); // Fecha o menu do usuário
    navigate('/'); // Navega para a página inicial
  };

  const handleMouseLeave = () => {
    setIsOpen(false); // Fecha o menu quando o mouse sai do menu
  };

  const handleUserMenuMouseLeave = () => {
    setIsUserMenuOpen(false); // Fecha o menu do usuário quando o mouse sai
  };

  const handleContactClick = () => {
    window.location.href = "https://wa.me/5516992614410"; // Redireciona para o WhatsApp
  };

  const openCadastroUsuarioModal = () => {
    setIsCadastroUsuarioOpen(true);
    setIsUserMenuOpen(false); // Fecha o menu do usuário ao abrir o modal de cadastro
    setIsOpen(false); // Fecha o menu principal ao abrir o modal de cadastro
  };

  return (
    <MenuContainer>
      <MenuHeader>
        <NavLink to='/'><span>Mantec</span></NavLink>
        <Espacamento>
          <MenuIcon onClick={toggleMenu}>
            <FaBars size='1.50em' />
          </MenuIcon>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Erro ao carregar dados de usuário</p>
          ) : (
            <>
              {auth.currentUser ? (
                <>
                  <FaUser 
                    onClick={toggleUserMenu} 
                    style={{ cursor: 'pointer' }} 
                    size='1.40em'
                    onMouseEnter={() => setIsUserMenuOpen(true)}
                  />
                  <UserMenu 
                    open={isUserMenuOpen} 
                    onMouseLeave={handleUserMenuMouseLeave}
                  >
                    <UserMenuItem style={{ cursor: 'pointer' }} >{auth.currentUser.email}</UserMenuItem>
                    <UserMenuItem onClick={handleLogout} style={{ cursor: 'pointer' }} >Sair</UserMenuItem>
                  </UserMenu>
                </>
              ) : (
                <FaSignInAlt 
                  onClick={toggleLoginModal} 
                  size='1.40em'
                  style={{ cursor: 'pointer' }} 
                />
              )}
              <ModalLogin isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
              {isCadastroUsuarioOpen && ( // Renderiza o modal de cadastro de usuário se isCadastroUsuarioOpen for true
                <ModalCadastroUsuario isOpen={isCadastroUsuarioOpen} onClose={() => setIsCadastroUsuarioOpen(false)} />
              )}
            </>
          )}
        </Espacamento>
      </MenuHeader>
      <Sidebar open={isOpen} onMouseLeave={handleMouseLeave}>
        <ul>
          {auth.currentUser ? (
            <>
              <MenuItem>
                <MenuLink to="/" onClick={toggleMenu}>
                  Início
                </MenuLink>
              </MenuItem>
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
              <UserMenuItem>
                <MenuLink onClick={openCadastroUsuarioModal}> {/* Substitui o to="/cadastro-usuario" por onClick */}
                  Cadastrar Usuário
                </MenuLink>
              </UserMenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <MenuLink to="/computador" onClick={toggleMenu}>
                  Computador
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/celular" onClick={toggleMenu}>
                  Celular
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/tablet" onClick={toggleMenu}>
                  Tablet
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/notebook" onClick={toggleMenu}>
                  Notebook
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink as="a" onClick={handleContactClick}>
                  Contato
                </MenuLink>
              </MenuItem>
            </>
          )}
        </ul>
      </Sidebar>
    </MenuContainer>
  );
};

export default Menu;

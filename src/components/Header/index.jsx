import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  FaBars, 
  FaSignInAlt, 
  FaUser, 
  FaCaretDown, 
  FaCaretUp,
  FaHome,
  FaList,
  FaCogs,
  FaUsers,
  FaBox,
  FaLaptop,
  FaMobileAlt,
  FaTabletAlt,
  FaDesktop,
  FaPhone,
  FaClipboardList,
  FaShoppingCart,
  FaUserPlus,
  FaTools,
  FaWarehouse
} from 'react-icons/fa';
import useAuthentication from '../../hooks/userAuthentication';
import {
  MenuContainer,
  Espacamento,
  MenuHeader,
  MenuIcon,
  Sidebar,
  MenuItem,
  MenuLink,
  SubMenuLink,
  UserMenu,
  UserMenuItem,
  SubMenu,
  SubMenuItem,
  UserIconWrapper,
  LoginIconWrapper,
  MenuOverlay,
} from './style';

const Menu = ({ onLoginClick, onCadastroUsuarioClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isListagensSubMenuOpen, setIsListagensSubMenuOpen] = useState(false); // Estado para controlar o submenu de Listagens
  const [isOperacoesSubMenuOpen, setIsOperacoesSubMenuOpen] = useState(false); // Estado para controlar o submenu de Operações
  const { loading, error, logout, auth } = useAuthentication(); // Use seu hook de autenticação

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleListagensSubMenu = () => {
    setIsListagensSubMenuOpen(!isListagensSubMenuOpen);
    if (isOperacoesSubMenuOpen) setIsOperacoesSubMenuOpen(false); // Fecha o submenu de Operações se estiver aberto
  };

  const toggleOperacoesSubMenu = () => {
    setIsOperacoesSubMenuOpen(!isOperacoesSubMenuOpen);
    if (isListagensSubMenuOpen) setIsListagensSubMenuOpen(false); // Fecha o submenu de Listagens se estiver aberto
  };

  const navigate = useNavigate();

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
    onCadastroUsuarioClick();
    setIsUserMenuOpen(false); // Fecha o menu do usuário ao abrir o modal de cadastro
    setIsOpen(false); // Fecha o menu principal ao abrir o modal de cadastro
  };

  return (
    <MenuContainer>
      <MenuHeader>
        <NavLink to='/'><span>Mantec</span></NavLink>
        <Espacamento>
          <MenuIcon onClick={toggleMenu}>
            <FaBars size='1.55em' style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
          </MenuIcon>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Erro ao carregar dados de usuário</p>
          ) : (
            <>
              {auth.currentUser ? (
                <>
                  <UserIconWrapper
                    onClick={toggleUserMenu}
                    onMouseEnter={() => setIsUserMenuOpen(true)}
                  >
                    <FaUser size='1.40em' />
                  </UserIconWrapper>
                  <UserMenu
                    open={isUserMenuOpen}
                    onMouseLeave={handleUserMenuMouseLeave}
                  >
                    <UserMenuItem>{auth.currentUser.email}</UserMenuItem>
                    <UserMenuItem onClick={handleLogout}>Sair</UserMenuItem>
                  </UserMenu>
                </>
              ) : (
                <LoginIconWrapper onClick={onLoginClick}>
                  <FaSignInAlt size='1.40em' />
                </LoginIconWrapper>
              )}
            </>
          )}
        </Espacamento>
      </MenuHeader>
      <Sidebar
        open={isOpen}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '320px',
          maxWidth: '90vw',
        }}
      >
        <ul>
          {auth.currentUser ? (
            <>
              <MenuItem>
                <MenuLink to="/" onClick={toggleMenu}>
                  <FaHome size="1.1em" />
                  Início
                </MenuLink>
              </MenuItem>
              <MenuItem onClick={toggleListagensSubMenu}>
                <MenuLink as="div">
                  <FaList size="1.1em" />
                  Listagens
                  <span style={{ marginLeft: '8px', transition: 'transform 0.3s ease', transform: isListagensSubMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    {isListagensSubMenuOpen ? <FaCaretUp size="0.8em" /> : <FaCaretDown size="0.8em" />}
                  </span>
                </MenuLink>
                {isListagensSubMenuOpen && (
                  <SubMenu>
                    <SubMenuItem>
                      <SubMenuLink to="/clientes" onClick={toggleMenu}>
                        <FaUsers size="0.9em" />
                        Clientes
                      </SubMenuLink>
                    </SubMenuItem>
                    <SubMenuItem>
                      <SubMenuLink to="/produtos" onClick={toggleMenu}>
                        <FaBox size="0.9em" />
                        Produtos
                      </SubMenuLink>
                    </SubMenuItem>
                    <SubMenuItem>
                      <SubMenuLink to="/funcionarios" onClick={toggleMenu}>
                        <FaUser size="0.9em" />
                        Funcionários
                      </SubMenuLink>
                    </SubMenuItem>
                    <SubMenuItem>
                      <SubMenuLink to="/servicos" onClick={toggleMenu}>
                        <FaTools size="0.9em" />
                        Serviços
                      </SubMenuLink>
                    </SubMenuItem>
                    <SubMenuItem>
                      <SubMenuLink to="/estoque" onClick={toggleMenu}>
                        <FaWarehouse size="0.9em" />
                        Estoque
                      </SubMenuLink>
                    </SubMenuItem>
                  </SubMenu>
                )}
              </MenuItem>
              <MenuItem onClick={toggleOperacoesSubMenu}>
                <MenuLink as="div">
                  <FaCogs size="1.1em" />
                  Operações
                  <span style={{ marginLeft: '8px', transition: 'transform 0.3s ease', transform: isOperacoesSubMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    {isOperacoesSubMenuOpen ? <FaCaretUp size="0.8em" /> : <FaCaretDown size="0.8em" />}
                  </span>
                </MenuLink>
                {isOperacoesSubMenuOpen && (
                  <SubMenu>
                    <SubMenuItem>
                      <SubMenuLink to="/ordem-de-servico" onClick={toggleMenu}>
                        <FaClipboardList size="0.9em" />
                        Ordens de Serviço
                      </SubMenuLink>
                    </SubMenuItem>
                    <SubMenuItem>
                      <SubMenuLink to="/vendas" onClick={toggleMenu}>
                        <FaShoppingCart size="0.9em" />
                        Vendas
                      </SubMenuLink>
                    </SubMenuItem>
                  </SubMenu>
                )}
              </MenuItem>
              <MenuItem>
                <MenuLink onClick={openCadastroUsuarioModal}>
                  <FaUserPlus size="1.1em" />
                  Cadastro de Usuários
                </MenuLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <MenuLink to="/computador" onClick={toggleMenu}>
                  <FaDesktop size="1.1em" />
                  Computador
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/celular" onClick={toggleMenu}>
                  <FaMobileAlt size="1.1em" />
                  Celular
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/tablet" onClick={toggleMenu}>
                  <FaTabletAlt size="1.1em" />
                  Tablet
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to="/notebook" onClick={toggleMenu}>
                  <FaLaptop size="1.1em" />
                  Notebook
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink as="a" onClick={handleContactClick}>
                  <FaPhone size="1.1em" />
                  Contato
                </MenuLink>
              </MenuItem>
            </>
          )}
        </ul>
      </Sidebar>
      <MenuOverlay open={isOpen} onClick={toggleMenu} />
    </MenuContainer>
  );
};

export default Menu;

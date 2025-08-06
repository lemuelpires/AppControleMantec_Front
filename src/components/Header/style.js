import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import Z_INDEX from '../../styles/zIndex';

// Animações
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const slideIn = keyframes`
  from { transform: translateX(100%) scale(0.95); opacity: 0; }
  to { transform: translateX(0) scale(1); opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1); }
  70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

export const MenuContainer = styled.nav`
  background: linear-gradient(135deg, #22292a 0%, #2c3e50 50%, #22292a 100%);
  color: white;
  padding: 1rem 4rem;
  position: relative;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: ${Z_INDEX.HEADER};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const Espacamento = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 1.5rem;
  position: relative;
`;

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #d9d9d9;
  position: relative;
  z-index: 1;

  span {
    color: #ffffff;
    font-size: 28px;
    font-style: italic;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #ffffff 0%, #e8e8e8 50%, #ffffff 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s ease-in-out infinite;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2));
    }
  }
  
  a {
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      animation: ${float} 2s ease-in-out infinite;
    }
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px) scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
  
  svg {
    transition: all 0.3s ease;
    color: #ffffff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    
    &:hover {
      transform: rotate(90deg);
    }
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 320px;
  background: linear-gradient(145deg, 
    rgba(44, 62, 80, 0.95) 0%, 
    rgba(52, 73, 94, 0.95) 35%, 
    rgba(44, 62, 80, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  color: #ffffff;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${Z_INDEX.SIDEBAR};
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${props => props.open ? '-10px 0 30px rgba(0, 0, 0, 0.3)' : 'none'};
  animation: ${props => props.open ? slideIn : 'none'} 0.4s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%);
    pointer-events: none;
  }

  ul {
    list-style: none;
    list-style-type: none;
    padding: 0;
    margin-top: 3rem;
    position: relative;
    z-index: 1;
    
    li {
      list-style: none;
      list-style-type: none;
    }
  }
  
  @media (max-width: 480px) {
    width: 100vw;
    padding: 2rem 1rem;
  }
`;

export const MenuItem = styled.li`
  padding: 0;
  text-align: left;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  list-style-type: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 100%
    );
    transform: translateX(8px) scale(1.02);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateX(4px) scale(0.98);
  }
`;

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 1.2rem;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  gap: 0.8rem;

  &:hover {
    text-decoration: none;
    color: #ffffff;
    cursor: pointer;
  }
  
  svg {
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    
    &:last-child {
      margin-left: auto;
    }
  }
  
  &:hover svg:not(:last-child) {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

export const SubMenuLink = styled(NavLink)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  margin: 0.2rem 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  svg {
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
  }

  &:hover {
    text-decoration: none;
    color: #ffffff;
    cursor: pointer;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    transform: translateX(4px);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
    svg {
      color: #ffffff;
      transform: scale(1.1);
    }
  }
  
  &.active {
    color: #ffffff;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.08));
    font-weight: 500;
    border-left: 3px solid rgba(255, 255, 255, 0.5);
    
    svg {
      color: #ffffff;
    }
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: linear-gradient(145deg, 
    rgba(44, 62, 80, 0.95) 0%, 
    rgba(52, 73, 94, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  color: #ffffff;
  padding: 1.2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: ${Z_INDEX.DROPDOWN};
  min-width: 200px;
  transform: ${props => (props.open ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)')};
  opacity: ${props => (props.open ? 1 : 0)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(44, 62, 80, 0.95);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
    border-radius: 16px;
    pointer-events: none;
  }
`;

export const UserMenuItem = styled.div`
  padding: 0.8rem 1rem;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &:first-child {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
    
    &:hover {
      background: none;
      transform: none;
    }
  }
  
  &:not(:first-child)::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:not(:first-child):hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    transform: translateX(4px) scale(1.02);
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateX(2px) scale(0.98);
  }
  
  & + & {
    margin-top: 0.2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1rem;
  }
`;

export const SubMenu = styled.ul`
  list-style: none;
  list-style-type: none;
  padding: 0;
  margin: 0.5rem 0;
  padding-left: 1rem;
  width: 100%;
  border-left: 3px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0.02) 100%
  );
  border-radius: 0 12px 12px 0;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.4) 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0.4) 100%
    );
    animation: ${shimmer} 2s ease-in-out infinite;
  }
`;

export const SubMenuItem = styled.li`
  padding: 0;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0.1rem 0;
  position: relative;
  width: 100%;
  display: block;
  list-style: none;
  list-style-type: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(2px);
  }
`;

export const UserIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px) scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
  
  svg {
    transition: all 0.3s ease;
    color: #ffffff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
`;

export const LoginIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px) scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 123, 255, 0.5));
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
  
  svg {
    transition: all 0.3s ease;
    color: #ffffff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    
    &:hover {
      transform: rotate(-5deg);
      color: #007bff;
    }
  }
`;

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: ${Z_INDEX.MENU_OVERLAY};
  opacity: ${props => (props.open ? 1 : 0)};
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

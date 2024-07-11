import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MenuContainer = styled.nav`
  background-color: #22292a;
  color: white;
  padding: 0.75em 4em;
`;

export const Espacamento = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 1em;
  position: relative;
`;

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #d9d9d9;

  span {
    color: #d9d9d9;
    font-size: 24px;
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: #333;
  color: #d9d9d9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;

  ul {
    list-style-type: none;
    padding: 0;
  }
`;

export const MenuItem = styled.li`
  padding: 10px 0;

  &:hover {
    background-color: #444;
  }
`;

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: none;
    color: #d9d9d9;
    cursor: pointer;
  }
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: ${props => (props.open ? 'block' : 'none')};
`;

export const UserMenuItem = styled.div`
  padding: 5px 0;

  &:hover {
    background-color: #444;
  }
`;

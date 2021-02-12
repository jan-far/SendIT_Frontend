import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NavHeader = styled.div`
  background: #101569;
  height: 80px;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
  color: white;
  font-weight: bold;
  font-size: large;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const Title = styled.div`
  margin-left: 15px;
  grid-column: 1;
  place-self: center start;
  place-items: center center;
  width: 100%;
`;

export const Info = styled.div`
  grid-column: 2;
  grid-column-start: end;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Menu = styled.ul`
  text-decoration: none;
  grid-auto-flow: row;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  text-align: center;
`;

export const MenuItem = styled.li`
  height: 40px;
`;

export const MenuLink = styled(Link)`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  color: #ff99;
  align-items: center;
  justify-self: center;
  justify-content: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    color:#fff;
    transition: 0.1s ease-in-out;
  }
`;

export const User = styled.div`
  display: flex;
  flex-direction: row;
  place-items: center center;
  background: #101560;
  padding: 10px;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid seagreen;
`;

export const UserDetails = styled.span`
  font-size: large;
  font-weight: bold;
  text-align: center;
  margin-left: 5px;
  margin-right: 15px;

  &::before {
    content: '|';
    margin: 10px;
    color: lightgreen;
  }

  @media screen and (max-width: 768px) {
    &::before {
      color: #000;
    }
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.5s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  place-content: center center;
  place-items: center center;
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;
`;

export const SidebarLink = styled(Link)`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

export const SideUser = styled.div`
  display: flex;
  justify-content: center;
  background: green;
  width: 20%;
  padding: 20px;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
    background-color: #01bf61;
    color: black;
    transform: scaleX(1.1);
  }
`;

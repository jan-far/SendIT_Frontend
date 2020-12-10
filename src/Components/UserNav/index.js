import React from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import {
  NavHeader,
  Menu,
  Title,
  MenuItem,
  MenuLink,
  User,
  Icon,
  UserDetails,
  Info,
  MobileIcon,
  SidebarMenu,
  SidebarContainer,
  SidebarWrapper,
  SidebarLink,
  SideUser,
  CloseIcon,
} from './UserNavElements';

const UserNav = ({
  isOpen,
  toggle,
  title,
  username,
  first,
  toFirst,
  second,
  toSecond,
  third,
  toThird,
  forth,
  toForth,
}) => {
  return (
    <>
      <NavHeader>
        <Title>{title}</Title>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
          <Icon onClick={toggle}>
            <CloseIcon />
          </Icon>
          <SidebarWrapper>
            <SidebarMenu>
              <SidebarLink to="/" onClick={toggle}>
                Home
              </SidebarLink>
              <SidebarLink show={toFirst ? true : false} to={({toFirst}) => (toFirst ? {toFirst} : undefined)} onClick={toggle}>
                {first}
              </SidebarLink>
              <SidebarLink  show={toSecond ? true : false} to={({toSecond}) => (toSecond ? {toSecond} : undefined)} onClick={toggle}>
                {second}
              </SidebarLink>
              <SidebarLink  show={toThird ? true : false} to={({toThird}) => (toThird ? {toThird} : undefined)} onClick={toggle}>
                {third}
              </SidebarLink>
              <SidebarLink  show={toForth ? true : false} to={({toForth}) => (toForth ? {toForth} : undefined)} onClick={toggle}>
                {forth}
              </SidebarLink>
            </SidebarMenu>
            <SideUser>
              <FaUser />
              <UserDetails>{username}</UserDetails>
            </SideUser>
          </SidebarWrapper>
        </SidebarContainer>

        <Info>
          <Menu>
            <MenuItem>
              <MenuLink to="/">Home</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink  show={toFirst ? true : false} to={({toFirst}) => (toFirst ? {toFirst} : undefined)}>{first}</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink  show={toSecond ? true : false} to={({toSecond}) => (toSecond ? {toSecond} : undefined)}>{second}</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink  show={toThird ? true : false} to={({toThird}) => (toThird ? {toThird} : undefined)}>{third}</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink  show={toForth ? true : false} to={({toForth}) => (toForth ? {toForth} : undefined)}>{forth}</MenuLink>
            </MenuItem>
          </Menu>
          <User>
            <FaUser />
            <UserDetails>{username}</UserDetails>
          </User>
        </Info>
      </NavHeader>
    </>
  );
};

export default UserNav;

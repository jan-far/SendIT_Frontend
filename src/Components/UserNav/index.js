import { Avatar, Zoom } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import React from 'react';
import { FaBars } from 'react-icons/fa';
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
              <SidebarLink show="true" to="/" onClick={toggle}>
                Home
              </SidebarLink>
              <SidebarLink
                show={toFirst}
                to={toFirst ? toFirst : ''}
                onClick={toggle}
              >
                {first}
              </SidebarLink>
              <SidebarLink
                show={toSecond}
                to={toSecond ? toSecond : ''}
                onClick={toggle}
              >
                {second}
              </SidebarLink>
              <SidebarLink
                show={toThird}
                to={toThird ? toThird : ''}
                onClick={toggle}
              >
                {third}
              </SidebarLink>
              <SidebarLink
                show={toForth}
                to={toForth ? toForth : ''}
                onClick={toggle}
              >
                {forth}
              </SidebarLink>
            </SidebarMenu>
            <SideUser>
              {username ? (
                <>
                  <Zoom in={true}>
                    <Avatar alt="user logo" style={{ color: 'green' }}>
                      {username[0]}
                    </Avatar>
                  </Zoom>
                  <UserDetails>{username}</UserDetails>
                </>
              ) : (
                <>
                  <Person />
                </>
              )}
            </SideUser>
          </SidebarWrapper>
        </SidebarContainer>

        <Info>
          <Menu>
            <MenuItem>
              <MenuLink show="true" to="/">
                Home
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink show={toFirst} to={toFirst ? toFirst : ''}>
                {first}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink show={toSecond} to={toSecond ? toSecond : ''}>
                {second}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink show={toThird} to={toThird ? toThird : ''}>
                {third}
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink show={toForth} to={toForth ? toForth : ''}>
                {forth}
              </MenuLink>
            </MenuItem>
          </Menu>
          <User>
            {username ? (
              <>
                <Zoom in={true}>
                  <Avatar alt="user logo" style={{ color: 'green' }}>
                    {username[0]}
                  </Avatar>
                </Zoom>
                <UserDetails>{username}</UserDetails>
              </>
            ) : (
              <>
                <Person />
              </>
            )}
          </User>
        </Info>
      </NavHeader>
    </>
  );
};

export default UserNav;

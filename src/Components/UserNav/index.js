import { Avatar, Zoom } from '@material-ui/core';
import { Person, PowerSettingsNew } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { UserContext } from '../../Contexts/User';
import { clearCookie } from '../../Services/utils/helpers';
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
  Logout,
} from './UserNavElements';

const UserNav = ({
  isOpen,
  toggle,
  title,
  first,
  toFirst,
  second,
  toSecond,
  third,
  toThird,
  forth,
  toForth,
}) => {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const logout = () => {
    clearCookie();
  };

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
            <SideUser onClick={() => logout()} to="/">
              {user ? (
                <>
                  <Zoom in={true}>
                    <Avatar alt="user logo" style={{ color: 'green' }}>
                      {user.firstname === undefined
                        ? 'A'
                        : `${user.firstname}`[0]}
                    </Avatar>
                  </Zoom>
                  <UserDetails logout="true">
                    <PowerSettingsNew/> Logout
                  </UserDetails>
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
          <User onClick={() => setShow(!show)}>
            {user ? (
              <>
                <Zoom in={true}>
                  <Avatar alt="user logo" style={{ color: 'green' }}>
                    {user.firstname === undefined
                      ? 'A'
                      : `${user.firstname}`[0]}
                  </Avatar>
                </Zoom>
                <UserDetails>
                  {user.firstname === undefined ? 'Admin' : user.firstname}
                </UserDetails>
                <Logout show={show ? show.toString() : undefined} to="/" onClick={() => logout()}>
                   <PowerSettingsNew/> &nbsp; Logout
                </Logout>
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

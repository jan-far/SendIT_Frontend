import { Avatar, Zoom } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { HomepageContext } from '../../Contexts/Homepage';
import { UserContext } from '../../Contexts/User';
import { RouteButton } from '../ButtonElements';
import { User, UserDetails } from '../UserNav/UserNavElements';
import {
  SidebarContainer,
  CloseIcon,
  Icon,
  SidebarWrapper,
  SidebarMenu,
  SideBtnWrap,
  SidebarLink,
  SidebarRoute,
  SidebarSignup,
} from './SidebarElements';

const Sidebar = () => {
  const { isOpen, toggle } = useContext(HomepageContext);
  const { user } = useContext(UserContext);

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggle}>
            Home
          </SidebarLink>
          <SidebarLink to="about" onClick={toggle}>
            About
          </SidebarLink>
          <SidebarLink to="service" onClick={toggle}>
            Services
          </SidebarLink>
          {user ? (
            <div
              style={{
                width: '50%',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
            >
              <RouteButton to="/dashboard">Dashboard</RouteButton>
            </div>
          ) : (
            <SidebarSignup to="/signup" onClick={toggle}>
              Sign Up
            </SidebarSignup>
          )}
        </SidebarMenu>
        <SideBtnWrap>
          {user ? (
            <User>
              <>
                <Zoom in={true}>
                  <Avatar alt="user logo" style={{ color: 'green' }}>
                    {`${user.firstname}`[0]}
                  </Avatar>
                </Zoom>
                <UserDetails light="true">{user.firstname}</UserDetails>
              </>
            </User>
          ) : (
            <SidebarRoute to="/signin">Sign In</SidebarRoute>
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;

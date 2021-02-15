import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import {
  Nav,
  NavLinks,
  NavLogo,
  NavLogoImg,
  NavMenu,
  NavItem,
  NavbarContainer,
  MobileIcon,
  NavBtn,
  NavDetails,
  NavBtnLink,
  SignUp,
  User,
} from './NavbarElements';
import { useContext } from 'react';
import { HomepageContext } from '../../Contexts/Homepage';
import { UserContext } from '../../Contexts/User';
import { RouteButton } from '../ButtonElements';
import { Avatar, Zoom } from '@material-ui/core';
import { UserDetails } from '../UserNav/UserNavElements';
const logo = './images/logo.jpg';

const Navbar = () => {
  const { toggle } = useContext(HomepageContext);
  const { user } = useContext(UserContext);
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  return (
    <Nav scrollNav={scrollNav}>
      <NavbarContainer>
        <NavLogo to="/">
          <NavLogoImg src={logo} alt="SendIT" width="100px" />
        </NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavDetails>
          <NavMenu>
            <NavItem>
              <NavLinks
                to="/"
                smooth={true}
                duration={700}
                spy={true}
                exact="true"
                offset={-79}
              >
                Home
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="about"
                smooth={true}
                duration={700}
                spy={true}
                exact="true"
                offset={-79}
              >
                About
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="service"
                smooth={true}
                duration={700}
                spy={true}
                exact="true"
                offset={-79}
              >
                Services
              </NavLinks>
            </NavItem>
            {user ? (
              <RouteButton to="/dashboard">Dashboard</RouteButton>
            ) : (
              <NavItem>
                <SignUp to="/signup">Sign Up</SignUp>
              </NavItem>
            )}
          </NavMenu>
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
            <NavBtn>
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn>
          )}
        </NavDetails>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;

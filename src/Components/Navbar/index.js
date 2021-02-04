import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa'
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
  SignUp
} from './NavbarElements'
import { useContext } from 'react';
import { HomepageContext } from '../../Contexts/Homepage';
const logo  = './images/logo.jpg';

const Navbar = () => {
  const { toggle } = useContext(HomepageContext)
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if(window.scrollY >= 80) {
      setScrollNav(true)
    }else{
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, []);

  return (
    <Nav scrollNav={scrollNav}>
      <NavbarContainer>
        <NavLogo to='/' >
          <NavLogoImg src={logo} alt='SendIT' width='100px' />
        </NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavDetails>
          <NavMenu>
            <NavItem>
              <NavLinks
                to='/'
                smooth={true}
                duration={700}
                spy={true}
                exact='true'
                offset={-80}
              >Home</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to='about'
                smooth={true}
                duration={700}
                spy={true}
                exact='true'
                offset={-80}
              >About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to='service'
                smooth={true}
                duration={700}
                spy={true}
                exact='true'
                offset={-80}
              >Services</NavLinks>
            </NavItem>
            <NavItem>
              <SignUp to='/signup'>Sign Up</SignUp>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/signin'>Sign In</NavBtnLink>
          </NavBtn>
        </NavDetails>
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar

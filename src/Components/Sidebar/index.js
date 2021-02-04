import React from 'react';
import { useContext } from 'react';
import { HomepageContext } from '../../Contexts/Homepage';
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
} from './SidebarElements'

const Sidebar = () => {
  const { isOpen, toggle } = useContext(HomepageContext)

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle} >
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='/' onClick={toggle} >Home</SidebarLink>
          <SidebarLink to='about' onClick={toggle} >About</SidebarLink>
          <SidebarLink to='service' onClick={toggle} >Services</SidebarLink>
          <SidebarSignup to='/signup' onClick={toggle} >Sign Up</SidebarSignup>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/signin'>Sign In</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar

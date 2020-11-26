import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll';
import logo from '../../images/logo.jpg';
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLogo,
  FooterLinksItems,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialIconLink,
  WebsiteRights,
  SocialIcons,
  SocialLogo,
} from './FooterElements'

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  }

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLogo to='/' onClick={toggleHome}>
            <img src={logo} width='100px' alt='logo' />
          </FooterLogo>
          <FooterLinksWrapper>
            <FooterLinksItems>
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLink to='#'>Plot 111, Musa Aliro close, Maitama, Abuja.</FooterLink>
              <FooterLink to='#'>(+234)818-716-1673</FooterLink>
              <FooterLink to='#'>contact@SendIT.com</FooterLink>
              <FooterLink to='#'>reservation@SendIT.com</FooterLink>
            </FooterLinksItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinksItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to='/'>Join Us</FooterLink>
              <FooterLink to='/'>Testimonials</FooterLink>
              <FooterLink to='/'>Careers</FooterLink>
              <FooterLink to='/'>Investors</FooterLink>
              <FooterLink to='/'>Terms of services</FooterLink>
            </FooterLinksItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to='/' onClick={toggleHome}>SendIT</SocialLogo>
            <WebsiteRights>SendIT &copy; {new Date().getFullYear()} All rights reserved</WebsiteRights>
            <SocialIcons>
              <SocialIconLink href='//' targer='_blank' aria-label='facebook'>
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href='//' targer='_blank' aria-label='twitter'>
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink href='//' targer='_blank' aria-label='instagram'>
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href='//' targer='_blank' aria-label='youtube'>
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href='//' targer='_blank' aria-label='linkedin'>
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  )
}

export default Footer;

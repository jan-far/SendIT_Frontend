import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const gradient = `linear-gradient(#39598A, #2a3f44)`;

const darkMode = css`
  color: aliceblue;
  background: ${({ theme }) => theme.gradient};
`;

const lightMode = css`
  color: black;
  background: ${gradient};
`;

const modeColor = ({ theme }) => {
  return theme.mode === 'light' ? lightMode : darkMode;
};

export const FooterContainer = styled.footer`
  ${modeColor}
`;

export const FooterWrap = styled.div`
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 820px) {
    padding-top: 32px;
  }
`;
export const FooterLogo = styled.div`
  align-self: center;
  margin-left: -60%;
  margin-right: 60%;
  overflow: hidden;

  @media screen and (max-width: 968px) {
    margin: 0 40% 0 -40%;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterLinksItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  text-align: left;
  width: 160px;
  box-sizing: border-box;
  color: #fff;

  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;

export const FooterLinkTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 16px;
`;

export const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => (theme.mode === 'light' ? theme.text : '#01bf71')};
    transition: 0.3s ease-out;
  }
`;

export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const WebsiteRights = styled.small`
  color: #fff;
  margin-top: 16px;
  margin-bottom: 10px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 24px;
`;

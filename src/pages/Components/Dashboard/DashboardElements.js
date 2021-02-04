import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  overflow: hidden!important;

  :before {
    z-index: -100;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0, #101500 100%),
      linear-gradient(180deg, #101550 0%, transparent 100%);
  }
`;

export const Profile = styled.button`
  display: flex;
  flex-direction: column;
  color: black;
  margin-bottom: -2%;
`;

export const UserDash = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  background: rgba(10, 10, 10, 0.9);
  left: 0;
  top: -10;
  width: 100%;
  height: 150vh;
  overflow: auto;

  @media screen and (max-width: 480px) {
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    z-index: 5;
    background: rgba(10, 10, 10, 0.9);
    left: 0;
    top: 0;
    height: 150vh;
    overflow: auto;
  }
`;

export const ProfileInfo = styled.div`
  position: fixed;
  z-index: 2;
  width: 50%;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 10%;
  background-color: lightblue;
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    place-items: center center;
    margin-bottom: 10;
  }

  @media screen and (max-width: 480) {
    margin-top: 5%;
  }
`;

export const Close = styled.span`
  color: black;
  background-color: white;
  float: left;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 5px;
}

&:hover,
&:focus {
  color: white;
  text-decoration: none;
  background-color: red;
  cursor: pointer;
  }
`;

export const Field = styled.p`
  color: black;
  text-align: center;
  padding: 10px;
`;

export const Hr = styled.hr`
  background: black;
`;

export const UserTable = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center center;
  place-items: center center !important;

  @media screen and (max-width: 520px) {
    display: block;
    width: 100%;
  }
`;

export const SendParcel = styled(Link)`
  background: blue;
  margin: 10px auto;
  padding: 10px 5px;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: white;
    background-color: #010187;
  }
`;

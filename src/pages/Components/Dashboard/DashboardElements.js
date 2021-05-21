import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  height: 100vh;
  /* background: ${({theme}) => theme.body}; */

  /* :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to left bottom, rgba(0, 0, 0, 0.1), #101500),
      linear-gradient(to bottom right, #101550, #101505);
    z-index: -100;
  } */
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

export const Field = styled.div`
  display: grid;
  grid-template-columns: .5fr 1fr;
  color: black;
  justify-items: start;
  width: 100%;
  padding: 10px 0;
`;

export const Hr = styled.hr`
  color: wheat;
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

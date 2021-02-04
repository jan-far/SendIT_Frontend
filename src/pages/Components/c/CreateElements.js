import styled, { keyframes } from 'styled-components';

const button_loading = keyframes`
from{
  transform: rotate(0turn);
}
to{
  transform: rotate(1turn);
}`;

export const Body = styled.div`
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

export const ParcelContainer = styled.div`
  /* background: #010135; */
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  align-content: center;
  justify-content: center;
`;

export const CreateBtn = styled.button`
  align-self: center;
  margin: 10px 0px 15px 0px;
  padding: 10px;
  border-radius: 50px;
  background-color: rgb(161, 20, 20);
  color: wheat;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #04110f;
    color: white;
    transform: scale(1.1);
  }
`;

export const FormModel = styled.div`
  display: ${({ create }) => (create ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-x: hidden;
  /* position: absolute; */
  top: 0;
  left: 0;
  overflow-y: scroll;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const FormContent = styled.div`
  padding: 35px;
  position: relative;
  margin: 25px auto;
  border-radius: 4px;
  /* margin: 0 auto; */

  @media screen and (max-width: 480px) {
    padding: 10px;
    margin: 10px 15px;
  }
`;

export const Form = styled.form`
  display: grid;
  position: relative;
  background: #010135;
  max-width: 500px;
  z-index: 1;
  margin: 15px auto;
  padding: 80px 32px;
  border-radius: 4px;
  box-shadow: 0 10px 13px rgba(190, 190, 190, 0.9);

  @media screen and (max-width: 480px) {
    padding: 15px 32px;
    margin-top: 20px;
    height: 85%;
  } ;
`;

export const Title = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: white;

  @media screen and (max-width: 480px) {
    margin-bottom: 5px;
  }
`;

export const FormInput = styled.input`
  border-radius: 5px;
  padding: 16px;
  border: none;
  margin-bottom: 32px;
`;

export const Close = styled.span`
  float: right;
  /* margin: 0 auto; */
  font-size: 25px;
  color: #6b6767;
  z-index: 3;
  cursor: pointer;

  &:hover {
    background-color: red;
    color: white;
  }

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;

export const FormButton = styled.button`
  position: relative;
  background: #01bf71;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  margin: 0 auto;
  width: 80%;

  &:hover {
    color: white;
    background-color: #01bf61;
    transform: scale(105%);
  }
`;

export const Spinner = styled.div`
  padding: 13px 0;

  &::after {
    content: '';
    z-index: 2;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: ${button_loading} 1s ease infinite;
  }
`;

export const DisplayTable = styled.div`
  display: grid;
  place-content: center center;

  @media screen and (max-width: 768px) {
    /* display: none; */
  }
`;

export const Text = styled.h2`
  text-align: center;
  margin-top: 24px;
  color: white;
  font-size: 24px;
`;

export const MobileView = styled.div`
display: grid;
place-items: center center;
grid-auto-flow: row;
`;

export const Select = styled.select`
  padding: 10px;
  width: 40%;
  border: 1px outset;
  border-radius: 30px;
  outline: 1px grey;
  place-self: center center;
`;

export const Option = styled.option`
  margin-right: 10px;
  padding: 10px 0;
`;

export const DisplaySelected = styled.div`
  display: flex;
  padding: 10px;
  width: 250px;
  background-color: red;
`;


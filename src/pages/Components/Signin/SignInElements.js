import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const Container = styled.div`
min-height: 692px;
position: relative;
bottom: 0;
left: 0;
right: 0; 
top: 0 ;
z-index: 0;
overflow: hidden;
display: grid;
grid-template-columns: 1fr 1fr;
grid-auto-flow: column;
justify-content: center;
align-items: center;

:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, .8) 0%,
    #101545 100%
  ),
  linear-gradient(
    180deg,
    #101540 0%,
    transparent 100%);
}

@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
};

`

export const Image = styled.img`
width:100%;
z-index: 1;

@media screen and (max-width: 768px) {
  display: none;
};
`

export const FormWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;


@media screen and (max-width: 480px) {
  height: 80%;
};
`

export const Icon = styled(Link)`
margin: 32px 0 0 32px;
text-decoration: none;
align-self: center;
z-index: 1;

@media screen and (max-width: 480px) {
  margin: 8px 0 0 16px;
};
`

export const FormContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
z-index: 2;

@media screen and (max-width: 480px) {
  padding: 10px;
};
`

export const Form = styled.form`
display: grid;
background: #010101;
max-width: 400px;
height: auto;
width: 100%;
z-index: 1;
margin: 0 auto;
padding: 80px 32px;
border-radius: 4px;
box-shadow: 0 1px 3ppx rgba(0,0,0,0.9);

@media screen and (max-width: 480px) {
  padding: 32px 32px;
};
`

export const FormH1 = styled.h1`
margin-bottom: 40px;
color: #fff;
font-size: 20px;
font-weight: 400;
text-align: center;
`

export const FormLabel = styled.label`
font-size: 14px;
margin-bottom: 8px;
color: white
`

export const FormInput = styled.input`
border-radius: 5px;
padding: 16px;
border: none;
margin-bottom: 32px;
`

export const FormButton = styled.button`
background: #01bf71;
padding: 16px 0;
border: none;
border-radius: 4px;
font-size:20px;
cursor: pointer;
`

export const Text = styled.span`
text-align: center;
margin-top: 24px;
color: white;
font-size: 14px;
`
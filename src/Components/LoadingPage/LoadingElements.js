import styled, {createGlobalStyle, keyframes} from 'styled-components';

export const BodyColor = createGlobalStyle`
body {
  background: ${({Background}) => (Background ? 'grey': 'wheat')}
}
`

const clockwisespin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const anticlockwisespin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(-360deg);}
`

export const Preload = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
grid-auto-columns: minmax(auto, 1fr);
grid-auto-flow: column;
`

export const PreloadWrapper = styled.div`
display: grid;
grid-column: 2;
grid-row: 3;
align-content: center;
justify-content: center;
`

export const Logo = styled.div`
grid-column: 2;
grid-row: 3;

@media screen and (max-width: 480px) {
  grid-row: 6;
}
`

export const LogoP = styled.p`
font-size: xx-large;
text-align: center;

@media screen and (max-width: 480px) {
  font-size: x-large;
}
`

export const LoaderFrame = styled.div`
justify-self: center;
grid-column:2;
grid-row: 4;
`

export const Loader1 = styled.div`
  border: 5px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border-top: 5px solid azure;
  border-bottom: 5px solid azure;
  animation: ${clockwisespin} 2s linear infinite;
`

export const Loader2 = styled.div`
  position: relative;
  border: 5px solid transparent;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border-right: 5px solid darkturquoise;
  border-left: 5px solid darkturquoise;
  top: -35px; left: 5px;
  animation: ${anticlockwisespin} 2s linear infinite;
`

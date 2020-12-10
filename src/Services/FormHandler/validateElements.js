import styled from 'styled-components';

export const ErrMsg = styled.p`
display: ${({show}) => (show ? 'block': 'none')};
color: red;
margin-top: -25px;
font-size: small;
font-weight: bold;
margin-bottom: 32px;
`;

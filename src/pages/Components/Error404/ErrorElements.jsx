import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
`;

export const ImgContainer = styled.img`
  width: 70%;
  height: 70%;
`;

export const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
}));

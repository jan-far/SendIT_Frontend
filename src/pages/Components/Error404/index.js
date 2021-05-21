import React from 'react';
import { Typography } from '@material-ui/core';
import { RouteButton } from '../../../Components/ButtonElements';
import { ImgContainer, ErrorContainer, useStyles } from './ErrorElements';
const logo = './images/mad-designer.png';

const Error_404 = () => {
  const classes = useStyles();
  React.useEffect(() => {
    document.title = 'Error 404';
  }, []);

  return (
    <>
      <ErrorContainer>
        <ImgContainer src={logo} alt="error image" />
        <Typography className={classes.text} component="h1" align="center">
          404 PAGE NOT FOUND
        </Typography>
        <RouteButton to="/" primary="true" dark="true">
          HOMEPAGE
        </RouteButton>
      </ErrorContainer>
    </>
  );
};

export default Error_404;

import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './withSpinnerElements';

const withSpinner = (WrappedComponent) => ({ stay, isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay stay={stay ? 'true' : null}>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default withSpinner;

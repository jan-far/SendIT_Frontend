import React from 'react'
import { BodyColor, Loader1, Loader2, LoaderFrame, Logo, LogoP, Preload, PreloadWrapper } from './LoadingElements';

const LoadingSpinner = () => {
  return (
    <>
      <BodyColor Background/>
      <Preload>
        <PreloadWrapper>
          <Logo>
            <LogoP>One Second</LogoP>
          </Logo>
          <LoaderFrame>
            <Loader1 />
            <Loader2 />
          </LoaderFrame>
        </PreloadWrapper>
      </Preload>
    </>
  )
}

export default LoadingSpinner

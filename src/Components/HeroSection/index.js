import React, { useState } from 'react';
import { RouteButton } from '../ButtonElements';
import video from '../../video/video.mp4';
import {
  HeroContainer,
  HeroContent,
  HeroBg,
  VideoBg,
  HeroH1,
  HeroH2,
  HeroHr,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from './HeroElements';

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover)
  }

  return (
    <>
      <HeroContainer id='/'>
        <HeroBg>
          <VideoBg autoPlay loop muted src={video} type='video/mp4' ></VideoBg>
        </HeroBg>
        <HeroContent imgStart={true}>
          <HeroH2>Welcome To SendIT
              <HeroHr></HeroHr>
          </HeroH2>
          <HeroH1>Enjoy Swift delivery</HeroH1>
          <HeroP>Send and Recieve your goods, without stress</HeroP>
          <HeroBtnWrapper>
            <RouteButton
              to='/signup'
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary='true'
              dark='true'
            >
              Join Us {hover ? <ArrowForward /> : <ArrowRight />}
            </RouteButton>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>
    </>
  )
}

export default HeroSection

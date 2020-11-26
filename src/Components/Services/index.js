import React from 'react'
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP  
} from './ServiceElements'

const Services = () => {
  return (
    <ServicesContainer id='service'>
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src='./svg/message_sent.svg' />
          <ServicesH2>FOR INDIVIDUALS</ServicesH2>
          <ServicesP>Want to send regular parcels? You may take a spin</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src='./svg/package_arrived.svg' />
          <ServicesH2>FOR SendITers</ServicesH2>
          <ServicesP>Want to be part of our happy and independent couriers community ?</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src='./svg/On_the_way.svg' />
          <ServicesH2>FOR Business</ServicesH2>
          <ServicesP>Want to offer to your customers a high quality delivery experience?</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services

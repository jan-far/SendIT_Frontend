import React, { useState } from 'react'
import Footer from '../../../Components/Footer';
import HeroSection from '../../../Components/HeroSection';
import InfoSection from '../../../Components/InfoSection';
import { homeObjOne } from '../../../Components/InfoSection/Data';
import Navbar from '../../../Components/Navbar';
import Services from '../../../Components/Services';
import Sidebar from '../../../Components/Sidebar';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <Services />
      <Footer />
    </>
  )
}

export default HomePage;
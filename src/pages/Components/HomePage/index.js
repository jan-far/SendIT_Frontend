import React from 'react';
import Footer from '../../../Components/Footer';
import HeroSection from '../../../Components/HeroSection';
import InfoSection from '../../../Components/InfoSection';
import { homeObjOne } from '../../../Components/InfoSection/Data';
import Navbar from '../../../Components/Navbar';
import Services from '../../../Components/Services';
import Sidebar from '../../../Components/Sidebar';
import HomepageProvider from '../../../Contexts/Homepage';

const HomePage = () => {
  React.useEffect(() => {
    document.title = "SendIT";
  }, []);

  return (
      <HomepageProvider>
        <Sidebar />
        <Navbar />
        <HeroSection />
        <InfoSection {...homeObjOne} />
        <Services />
        <Footer />
      </HomepageProvider>
  );
};

export default HomePage;

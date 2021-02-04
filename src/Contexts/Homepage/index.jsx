import React, { createContext, useState } from 'react';

export const HomepageContext = createContext({
  isOpen: false,
  toggle: () => {},
});

const HomepageProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <HomepageContext.Provider
      value={{
        isOpen: isOpen,
        toggle: toggle,
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;

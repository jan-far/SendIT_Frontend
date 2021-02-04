import React, { useState, createContext} from 'react';

export const DashboardContext = createContext({
  show: false,
  isOpen: false,
  toggle: () => {},
});

const DashboardProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const showProfile = () => setShow(!show);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DashboardContext.Provider
      value={{
        show,
        showProfile,
        toggle,
        isOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;

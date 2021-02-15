import React, { createContext, useContext, useEffect, useState } from 'react';
import { clearCookie } from '../../Services/utils/helpers';
import { UserContext } from '../User';
import { getUser } from '../../Services/authService'

export const HomepageContext = createContext({
  isOpen: false,
  toggle: () => {},
  user: {},
});

const HomepageProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const User = async () => {
      try {
        const req = await getUser();
        
        if (req.success) {
          return setUser({ ...req.user });
        } else {
          clearCookie()
          return setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    User();
  }, [setUser]);

  return (
    <HomepageContext.Provider
      value={{
        isOpen: isOpen,
        toggle: toggle,
        user: user,
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;

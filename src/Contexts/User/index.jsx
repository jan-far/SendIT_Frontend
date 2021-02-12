import React, { useState, useEffect, createContext } from 'react';
import { get_request } from '../../Services/utils/fetch';
import { clearCookie } from '../../Services/utils/helpers';

export const UserContext = createContext({
  user: {},
  setUser: () => {},
  Row: [],
  empty: false,
  setEmpty: () => {},
  isLoading: true,
  setLoading: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({}),
    [isLoading, setLoading] = useState(true),
    [Row, setRow] = useState([]),
    [empty, setEmpty] = useState(false);

  const getData = async () => {
    try {
      const req = await get_request('/parcels');
      const response = await req.json();

      if (!req || response.rows === undefined) {
        clearCookie();
        setLoading(false);
      } else if (response.rows === [] || response.rowCount === 0) {
        setEmpty(true);
        setLoading(false);
        return ' ';
      } else {
        setEmpty(false);
        setLoading(false);
        setRow([...response.rows]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        Row,
        empty,
        setEmpty: () => {},
        isLoading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

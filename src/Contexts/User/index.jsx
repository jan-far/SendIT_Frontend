import React, { useState, useEffect, createContext} from 'react';
import { get_request } from '../../Services/utils/fetch';

export const UserContext = createContext({
  data: {},
  Row: [],
  empty: false,
  isLoading: true,
});

const UserProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [Row, setRow] = useState([]);
  const [empty, setEmpty] = useState(false);

  const getUser = async () => {
    try {
      const req = await get_request('/users');
      const res = await req.json();

      if (!req) {
        console.log('Error occur');
      } else {
        setData(res.Profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const req = await get_request('/parcels');
      const response = await req.json();

      if (!req || response.rows === undefined) {
        console.log('error occured');
      } else if (response.rows === [] || response.rowCount === 0) {
        console.log('an empty data');
        setEmpty(true);
        setLoading(false)
        return ' ';
      } else {
        setEmpty(false);
        setLoading(false)
        setRow([...response.rows]);
        for (let i = 0; i < response.rowCount; i += 1) {
          // if (response.rows[i].status !== 'delivered') {
          //   count += 1;
          // }
          // records(response, count, (response.rowCount - count));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        data,
        Row,
        empty,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

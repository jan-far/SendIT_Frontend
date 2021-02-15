import React, { useState, useEffect, createContext } from 'react';
import { get_request } from '../../Services/utils/fetch';
import { clearCookie } from '../../Services/utils/helpers';

export const AdminContext = createContext({
  admin: {},
  setAdmin: () => {},
  users: [],
  Row: [],
  editing: false,
  setEditing: () => {},
  closeEdit: () => {},
  isLoading: true,
  setLoading: () => {},
  isOpen: false,
  toggle: () => {},
  selectedParcel: {},
  setSelectedParcel: () => {},
});

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState({}),
    [users, setUsers] = useState([]),
    [isLoading, setLoading] = useState(true),
    [Row, setRow] = useState([]),
    [editing, setEditing] = useState(false),
    [isOpen, setIsOpen] = useState(false),
    [selectedParcel, setSelectedParcel] = useState({});

  const closeEdit = () => {
    return setEditing(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const getData = async () => {
    try {
      const req = await get_request('/admin/parcels');
      const response = await req.json();

      if (!req || response.rows === undefined) {
        clearCookie();
        setLoading(false);
      } else if (response.rows === [] || response.rowCount === 0) {
        setLoading(false);
        return ' ';
      } else {
        setLoading(false);
        setRow([...response.rows]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const req = await get_request('/admin/users');
      const response = await req.json();

      if (!req || response.rows === undefined) {
        clearCookie();
        setLoading(false);
      } else if (response.rows === [] || response.rowCount === 0) {
        setLoading(false);
        return ' ';
      } else {
        setLoading(false);
        setUsers([...response.rows]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getUsers();
  }, [admin]);

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        users,
        Row,
        editing,
        setEditing,
        closeEdit,
        isLoading,
        setLoading,
        isOpen,
        toggle,
        selectedParcel,
        setSelectedParcel,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;

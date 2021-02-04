import React, { useState, useEffect, createContext } from 'react';
import { get_request } from '../../Services/utils/fetch';

export const CreateParcelContext = createContext({
  isOpen: false,
  editing: false,
  closeEdit: () => {},
  toggle: () => {},
});

const CreateParcelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const closeEdit = () => {
    setEditing(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CreateParcelContext.Provider
      value={{
        isOpen,
        editing,
        setEditing,
        closeEdit,
        toggle,
      }}
    >
      {children}
    </CreateParcelContext.Provider>
  );
};

export default CreateParcelProvider;

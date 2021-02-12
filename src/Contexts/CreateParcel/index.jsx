import React, { useState, createContext } from 'react';

export const CreateParcelContext = createContext({
  isOpen: false,
  editing: false,
  create: false,
  show: () => {},
  values: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    'confirm password': '',
    location: '',
    recipient: '',
    destination: '',
    weight: '',
  },
  closeEdit: () => {},
  toggle: () => {},
});

const CreateParcelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false),
  [editing, setEditing] = useState(false),
  [create, setCreate] = useState(false),
  [values, setVal] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    'confirm password': '',
    location: '',
    recipient: '',
    destination: '',
    weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({
      ...values,
      [name]: value,
    });
  };

  const closeEdit = () => {
    setEditing(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const show = () => {
    setCreate(!create);
  }

  return (
    <CreateParcelContext.Provider
      value={{
        isOpen,
        editing,
        create,
        show,
        setEditing,
        closeEdit,
        toggle,
        handleChange,
        values,
      }}
    >
      {children}
    </CreateParcelContext.Provider>
  );
};

export default CreateParcelProvider;

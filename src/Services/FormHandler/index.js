import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

function FormHandler() {
  const { register, handleSubmit, errors, control } = useForm();

  const [phone, setPhone] = useState()

  const [values, setValues] = useState({
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
    setValues({
      ...values,
      [name]: value,
    });
    // console.log(name, value);
  };

  const reset = () => {
    setValues({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      'confirm password': '',
      location: '',
    });
  };

  return {
    register,
    handleChange,
    handleSubmit,
    values,
    reset,
    errors,
    Controller,
    phone,
    setPhone,
    control,
  };
}

export default FormHandler;

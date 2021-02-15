import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

function FormHandler() {
  const { register, handleSubmit, errors, control, reset } = useForm();

  const [phone, setPhone] = useState();

  const [values, setVal] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    'confirm password': '',
    location: '',
    recipient: '',
    destination: '',
    weight: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({
      ...values,
      [name]: value,
    });
  };

  const resetInput = (e) => {
    setVal({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      'confirm password': '',
      location: '',
      destination: '',
      weight: '',
      recipient: '',
      status: '',
    });

    setPhone({
      phone: '',
    });
  };

  return {
    register,
    handleChange,
    handleSubmit,
    values,
    reset,
    resetInput,
    errors,
    Controller,
    phone,
    setPhone,
    control,
  };
}

export default FormHandler;

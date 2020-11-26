import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Place { geocodeByPlaceId, geocodeByAddress } from 'react-places-autocomplete'

function FormHandler() {
  const { register, handleSubmit, errors, control } = useForm();

  const [phone, setPhone] = useState();
  console.log(phone);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // password: "",
    password2: "",
    phone: 0,
    location: "",
  });
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(name, value);
  };

  return {
    register,
    handleChange,
    handleSubmit,
    values,
    errors,
    Controller,
    phone,
    setPhone,
    control,
  };
}

export default FormHandler;

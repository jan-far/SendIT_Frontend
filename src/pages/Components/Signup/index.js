import React, { useState } from 'react';
import logo from '../../../images/logo.jpg';
import FormHandler from '../../../Services/FormHandler';
import 'react-phone-number-input/style.css';
import './style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import LocationSearchInput from '../../../Components/GooglePlace';
import { post_request } from '../../../Services/utils/fetch';
import { Error } from '../../../Services/FormHandler/validateInfo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from '../../../Services/utils/helpers'
import { useHistory } from 'react-router-dom';
import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrapper,
  Goto,
  Icon,
  Image,
  Spinner,
  Text,
  Text2,
} from './SignUpElements';

toast.configure({
  position: 'bottom-left',
  autoClose: 5000,
  closeButton: true,
  draggable: false,
  hideProgressBar: true,
})

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    handleChange,
    values,
    phone,
    setPhone,
    Controller,
    control,
    reset,
    errors,
  } = FormHandler();
  const { firstname, lastname, email, password, location } = values;

  const history = useHistory();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    reset();
    try {
      const req = await post_request(data, '/auth/signup');
      const response = await req.json();
      console.log(response);

      if (response === undefined || req.status === 400) {
        toast.error(`${response.message}`)
        setLoading(false)
      } else {
        toast.success(`${response.message}`);
        setLoading(false);
        setCookie('session_', response.Token)

        setTimeout(() => {
          history.push('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validatePhone = (phone) => {
    const compare = phone
      ? isValidPhoneNumber(phone)
        ? undefined
        : 'Invalid phone number'
      : 'Phone number required';
    return phone && compare;
  };

  return (
    <>
      <Container>
        <Image src="./svg/deliveries.svg" />
        <FormWrapper>
          <Icon to="/">
            <img src={logo} width="100px" alt="logo" />
          </Icon>
          <FormContent>
            <Form action="#" onSubmit={handleSubmit(onSubmit)}>
              <FormH1>Sign in to your account</FormH1>
              <FormLabel htmlFor="for">First Name</FormLabel>
              <FormInput
                name="firstname"
                type="text"
                value={firstname}
                placeholder="Enter Your First Name"
                ref={register({
                  required: 'First name Cannot be empty!',
                  minLength: {
                    value: 2,
                    message: 'first name should be 2 or more characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Name too long, max of 20 characters',
                  },
                })}
                onChange={handleChange}
              />
              {Error(errors, 'firstname')}
  
              <FormLabel htmlFor="for">Last Name</FormLabel>
              <FormInput
                name="lastname"
                type="text"
                value={lastname}
                placeholder="Enter Your Last Name"
                ref={register({
                  required: 'Fast name Cannot be empty!',
                  minLength: {
                    value: 2,
                    message: 'last name should be 2 or more characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Name too long, max of 20 characters',
                  },
                })}
                onChange={handleChange}
              />
              {Error(errors, 'lastname')}

              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput
                name="email"
                type="email"
                value={email}
                placeholder="Enter Your Email Address"
                ref={register({
                  required: 'Email field is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
                onChange={handleChange}
              />
              {Error(errors, 'email')}
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput
                name="password"
                type="password"
                value={password}
                placeholder="Enter Your Password"
                ref={register({
                  required: 'Password field is required',
                  minLength: {
                    value: 7,
                    message: 'Password must be of atleast 7 characters',
                  },
                })}
                onChange={handleChange}
              />
              {Error(errors, 'password')}
              <FormLabel htmlFor="for">Repeat Password</FormLabel>
              <FormInput
                name="confirm password"
                type="password"
                value={password}
                placeholder="Re-enter Your Password"
                ref={register}
                onChange={handleChange}
              />
              <FormLabel htmlFor="for">Phone</FormLabel>
              <Controller
                name="phone"
                as={
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                    className="phone"
                    placeholder="Enter Your Phone Number"
                    defaultCountry="NG"
                    withCountryCallingCode
                  />
                }
                rules={{
                  required: 'Enter a valid phone number',
                  validate: { validatePhone },
                }}
                defaultValue=""
                control={control}
              />
              {Error(errors, 'phone')}

              <FormLabel htmlFor="for">Location</FormLabel>
              <Controller
                name="location"
                as={
                  <LocationSearchInput
                    value={location}
                    onChange={handleChange}
                  />
                }
                rules={{ required: 'Location field cannot be empty' }}
                control={control}
                defaultValue=""
              />
              {Error(errors, 'location')}

              <FormButton type="submit">
                {loading ? <Spinner /> : 'SignIn'}
              </FormButton>
              <Text>Forgot Password?</Text>
              <Text2>Already have an account? <Goto to='/signin'>SignIn</Goto></Text2>
            </Form>
          </FormContent>
        </FormWrapper>
      </Container>
    </>
  );
};

export default SignUp;

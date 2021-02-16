import React, { useContext, useState } from 'react';
import FormHandler from '../../../Services/FormHandler';
import 'react-phone-number-input/style.css';
import './style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import LocationSearchInput from '../../../Components/GooglePlace';
import { post_request } from '../../../Services/utils/fetch';
import { Error } from '../../../Services/FormHandler/validateInfo';
import { setCookie } from '../../../Services/utils/helpers';
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
import { UserContext } from '../../../Contexts/User';
import NotificationToast from '../../../Components/Toast';

const logo = './images/logo.jpg';

const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {
    watch,
    handleSubmit,
    handleChange,
    values,
    phone,
    setPhone,
    Controller,
    control,
    reset,
    resetInput,
    errors,
  } = FormHandler();
  const { firstname, lastname, email, password, location } = values;

  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);
    reset();
    resetInput();
    try {
      const req = await post_request(data, '/auth/signup');
      const response = await req.json();

      if (response === undefined || req.status === 400) {
        NotificationToast.error(`${response.message}`);
        setLoading(false);
      } else {
        NotificationToast.success(`${response.message}`);
        setLoading(false);
        setCookie('session_', response.Token);
        setUser({});

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

  const checkPassword = (pass) => {
    const passme = watch('password')
    const passKey = pass
      ? passme !== pass
        ? 'Passwords are not the same'
        : undefined
      : 'Password Confirmation is required';
    return pass && passKey;
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
              <FormH1>SignUp An Account!</FormH1>
              <FormLabel htmlFor="for">First Name</FormLabel>
              <Controller
                name="firstname"
                as={
                  <FormInput
                    type="text"
                    value={firstname}
                    placeholder="Enter Your First Name"
                    onChange={handleChange}
                  />
                }
                rules={{
                  required: 'First name Cannot be empty!',
                  minLength: {
                    value: 2,
                    message: 'first name should be 2 or more characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Name too long, max of 20 characters',
                  },
                }}
                defaultValue=""
                control={control}
              />
              {Error(errors, 'firstname')}

              <FormLabel htmlFor="for">Last Name</FormLabel>
              <Controller
                name="lastname"
                as={
                  <FormInput
                    type="text"
                    value={lastname}
                    placeholder="Enter Your Last Name"
                    onChange={handleChange}
                  />
                }
                rules={{
                  required: 'Fast name Cannot be empty!',
                  minLength: {
                    value: 2,
                    message: 'last name should be 2 or more characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Name too long, max of 20 characters',
                  },
                }}
                defaultValue=""
                control={control}
              />
              {Error(errors, 'lastname')}

              <FormLabel htmlFor="for">Email</FormLabel>
              <Controller
                name="email"
                as={
                  <FormInput
                    type="email"
                    value={email}
                    placeholder="Enter Your Email Address"
                    onChange={handleChange}
                  />
                }
                rules={{
                  required: 'Email field is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                }}
                defaultValue=""
                control={control}
              />
              {Error(errors, 'email')}

              <FormLabel htmlFor="for">Password</FormLabel>
              <Controller
                name="password"
                as={
                  <FormInput
                    value={password}
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                  />
                }
                rules={{
                  required: 'Password field is required',
                  minLength: {
                    value: 7,
                    message: 'Password must be of atleast 7 characters',
                  },
                }}
                defaultValue=""
                control={control}
              />
              {Error(errors, 'password')}

              <FormLabel htmlFor="for">Repeat Password</FormLabel>
              <Controller
                name="confirm password"
                as={
                  <FormInput
                    type="password"
                    value={values['confirm password']}
                    placeholder="Re-enter Your Password"
                    onChange={handleChange}
                  />
                }
                rules={{
                  required: 'Password Confirmation required',
                  validate: { checkPassword },
                }}
                defaultValue=""
                control={control}
              />
              {Error(errors, 'confirm password')}

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
              <Text2>
                Already have an account? <Goto to="/signin">SignIn</Goto>
              </Text2>
            </Form>
          </FormContent>
        </FormWrapper>
      </Container>
    </>
  );
};

export default SignUp;

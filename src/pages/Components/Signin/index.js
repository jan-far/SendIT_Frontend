import React, { useState } from 'react';
import FormHandler from '../../../Services/FormHandler';
import './styles.css';
import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrapper,
  Icon,
  Image,
  Spinner,
  Text,
  Text2,
  Goto,
} from './SignInElements';
import logo from '../../../images/logo.jpg';
import { Error } from '../../../Services/FormHandler/validateInfo';
import { post_request } from '../../../Services/utils/fetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie, clearCookie } from '../../../Services/utils/helpers';
import { useHistory } from 'react-router-dom';

toast.configure({
  autoClose: 5000,
  closeButton: true,
  draggable: false,
  position: 'bottom-left',
  hideProgressBar: true,
});

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    handleChange,
    values,
    reset,
    errors,
  } = FormHandler();
  const { email, password } = values;

  const history = useHistory();

  const check = () => {};

  const onSubmit = async (data) => {
    setLoading(true);
    clearCookie()
    reset();
    try {
      const req = await post_request(data, '/auth/signin');
      const response = await req.json();
      console.log(response);

      if (response === undefined || req.status === 400) {
        toast.error(`${response.message}`);
        setLoading(false);
      } else {
        setCookie('session_', response.Profile.token, 1);
        toast.success(`${response.message}`);
        setLoading(false);

        setTimeout(() => {
          history.push('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Image src="./svg/delivery_address.svg" />
        <FormWrapper>
          <Icon to="/">
            <img src={logo} width="100px" alt="logo" />
          </Icon>
          <FormContent>
            <Form action="#" onSubmit={handleSubmit(onSubmit)}>
              <FormH1>Sign in to your account</FormH1>
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
                    message: 'Invalid email address',
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

              <FormButton type="submit">
                {loading ? <Spinner /> : 'SignIn'}
              </FormButton>
              <Text>Forgot Password?</Text>
              <Text2>
                Don't have an account? <Goto to="/signup">SignUp</Goto>
              </Text2>
            </Form>
          </FormContent>
        </FormWrapper>
      </Container>
    </>
  );
};

export default SignInPage;

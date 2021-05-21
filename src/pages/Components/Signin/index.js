import React, { useContext, useState } from 'react';
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
import { Error } from '../../../Services/FormHandler/validateInfo';
import { post_request } from '../../../Services/utils/fetch';
import { setCookie, clearCookie } from '../../../Services/utils/helpers';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../Contexts/User';
import NotificationToast from '../../../Components/Toast';

const logo = './images/logo.jpg';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const {
    handleSubmit,
    handleChange,
    values,
    control,
    Controller,
    resetInput,
    errors,
  } = FormHandler();
  const { email, password } = values;

  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);
    clearCookie();
    resetInput();
    try {
      const req = await post_request(data, '/auth/signin');
      const response = await req.json();

      if (response === undefined || req.status === 400) {
        NotificationToast.error(`${response.message}`);
        setLoading(false);
      } else {
        setCookie('session_', response.Profile.token, 1);
        NotificationToast.success(`${response.message}`);
        setUser({ ...response.Profile });
        setLoading(false);

        setTimeout(() => {
          history.push('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    document.title = "Sign In";
  }, []);

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
                    message: 'Invalid email address',
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
                    type="password"
                    value={password}
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

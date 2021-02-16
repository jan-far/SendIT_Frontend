import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AdminContext } from '../../../../Contexts/Admin';
import { post_request } from '../../../../Services/utils/fetch';
import { Error } from '../../../../Services/FormHandler/validateInfo';
import { setCookie } from '../../../../Services/utils/helpers';
import FormHandler from '../../../../Services/FormHandler';
import {
  Container,
  FormWrapper,
  Icon,
  FormContent,
  Form,
  FormLabel,
  FormH1,
  FormInput,
  FormButton,
  Spinner,
} from './SignInElements';
import NotificationToast from '../../../../Components/Toast';

const logo = './images/logo.jpg';

const AdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setAdmin } = useContext(AdminContext);

  const {
    handleSubmit,
    handleChange,
    values,
    resetInput,
    Controller,
    control,
    errors,
  } = FormHandler();
  const { email, password } = values;

  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);
    resetInput();

    try {
      const req = await post_request(data, '/admin/signin');
      const response = await req.json();

      if (response === undefined || req.status !== 200) {
        NotificationToast.error(`${response.message}`);
        setLoading(false);
      } else {
        setCookie('session_', response.Profile.token, 1);
        NotificationToast.success(`${response.message}`);
        setAdmin({ ...response.Profile });
        setLoading(false);

        setTimeout(() => {
          history.push('/admin/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <FormWrapper>
          <Icon to="/">
            <img src={logo} width="100px" alt="logo" />
          </Icon>
          <FormContent>
            <Form action="#" onSubmit={handleSubmit(onSubmit)}>
              <FormH1>Admin SignIn</FormH1>
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
            </Form>
          </FormContent>
        </FormWrapper>
      </Container>
    </>
  );
};

export default AdminAuth;

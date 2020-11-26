import React from "react";
import FormHandler from "../../../Services/FormHandler";
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
  Text,
} from "./SignInElements";
import logo from "../../../images/logo.jpg";

const SignInPage = () => {
  const {register, handleSubmit, handleChange, values } = FormHandler();
  const { email, password } = values;

  const onSubmit = (data) => {
    console.log(data);
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
                required
                ref={register}
                onChange={handleChange}
              ></FormInput>
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput
                name="password"
                type="password"
                value={password}
                placeholder="Enter Your Password"
                required
                ref={register}
                onChange={handleChange}
              ></FormInput>
              <FormButton type="submit">SignIn</FormButton>
              <Text>Forgot Password?</Text>
            </Form>
          </FormContent>
        </FormWrapper>
      </Container>
    </>
  );
};

export default SignInPage;

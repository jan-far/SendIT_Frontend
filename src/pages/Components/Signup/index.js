import React from "react";
import logo from "../../../images/logo.jpg";
import FormHandler from "../../../Services/FormHandler";
import "react-phone-number-input/style.css";
import "./style.css";
import PhoneInput, {
  // formatPhoneNumber,
  // formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
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
} from "./SignUpElements";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    handleChange,
    values,
    phone,
    setPhone,
    Controller,
    control,
  } = FormHandler();
  const { email, password, password2, location } = values;

  const onSubmit = (data) => {
    console.log(data);
  };

  const callBack = (autoCompleteData) => {
    console.log(autoCompleteData)
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
                value={password}
                placeholder="Enter Your First Name"
                required
                ref={register}
                onChange={handleChange}
              />
              <FormLabel htmlFor="for">Last Name</FormLabel>
              <FormInput
                name="lastname"
                type="text"
                value={password}
                placeholder="Enter Your Last Name"
                required
                ref={register}
                onChange={handleChange}
              />
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput
                name="email"
                type="email"
                value={email}
                placeholder="Enter Your Email Address"
                required
                ref={register}
                onChange={handleChange}
              />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput
                name="password"
                type="password"
                value={password}
                placeholder="Enter Your Password"
                required
                ref={register}
                onChange={handleChange}
              />
              <FormLabel htmlFor="for">Repeat Password</FormLabel>
              <FormInput
                name="confirm password"
                type="password"
                value={password2}
                placeholder="Re-enter Your Password"
                required
                ref={register}
                onChange={handleChange}
              />
              <FormLabel htmlFor="for">Phone</FormLabel>
              <Controller
                name="phone"
                as={
                  <PhoneInput
                    type="tel"
                    className="phone"
                    value={phone}
                    inputRef={register}
                    placeholder="Enter Your Phone Number"
                    required
                    defaultCountry="NG"
                    withCountryCallingCode
                    onChange={setPhone}
                    error={
                      phone
                        ? isValidPhoneNumber(phone)
                          ? undefined
                          : "Invalid phone number"
                        : "Phone number required"
                    }
                    rules={{ required: true }}
                  />
                }
                defaultValue=""
                control={control}
              />
              <FormLabel htmlFor="for">Location</FormLabel>
              {/* <FormInput
                name="location"
                type="text"
                value={location}
                placeholder="Enter Your Location"
                required
                ref={register}
                onChange={handleChange}
              /> */}
              <FormButton type="submit">SignIn</FormButton>
              <Text>Forgot Password?</Text>
            </Form>
          </FormContent>
        </FormWrapper>
      </Container>
    </>
  );
};

export default SignUp;

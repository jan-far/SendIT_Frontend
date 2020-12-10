import React, { useState, useEffect } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import LocationSearchInput from '../../../Components/GooglePlace';
import FormHandler from '../../../Services/FormHandler';
import { Error } from '../../../Services/FormHandler/validateInfo';
import { get_request } from '../../../Services/utils/fetch';
import { toast } from 'react-toastify';
import Table from '../../../Components/Table';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';
import { getCookie } from '../../../Services/utils/helpers';
import '../Signup/style.css';
import {
  ParcelContainer,
  FormModel,
  Form,
  FormContent,
  Title,
  FormLabel,
  FormInput,
  FormButton,
  CreateBtn,
  Close,
  Spinner,
  DisplayTable,
} from './CreateElements';
import { FaTimes } from 'react-icons/fa';
import UserNav from '../../../Components/UserNav';

const CreateParcel = () => {
  const [loading, setLoading] = useState(false);
  const [Row, setRow] = useState([]);
  const [create, setCreate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');

  const {
    Controller,
    register,
    values,
    reset,
    errors,
    handleChange,
    handleSubmit,
    phone,
    control,
    setPhone,
  } = FormHandler();
  const { destination, recipient, location, weight } = values;
  const token = getCookie('session_');

  const onSubmit = () => {
    reset();
  };

  const validatePhone = (phone) => {
    const compare = phone
      ? isValidPhoneNumber(phone)
        ? undefined
        : 'Invalid phone number'
      : 'Phone number required';
    return phone && compare;
  };

  async function getUserData() {
    const req = await get_request('/parcels', token);
    const response = await req.json();
    setRow([...response.rows]);
  }

  const showCreate = () => {
    setCreate(!create);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  

  return (
    <>
      <UserNav
        title="Parcel Portal"
        first="Home"
        toFirst='/'
        // second="Dashboard"
        third="My Account"
        username={username}
        isOpen={isOpen}
        toggle={toggle}
      />
      <ParcelContainer>
        <Title>ORDER AND DELIVERIES</Title>
        <CreateBtn onClick={showCreate}>Create Order</CreateBtn>
        <FormModel create={create}>
          <FormContent>
            <Close onClick={showCreate}>
              <FaTimes />
            </Close>
            <Form action="#" onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor="for">Recipient</FormLabel>
              <FormInput
                name="recipient"
                type="recipient"
                value={recipient}
                placeholder="Enter Recipient Name"
                ref={register({
                  required: 'Recipient field is required',
                })}
                onChange={handleChange}
              />
              {Error(errors, 'recipient')}

              <FormLabel htmlFor="for">Destination</FormLabel>
              <FormInput
                name="destination"
                type="text"
                value={destination}
                placeholder="Enter Destination"
                ref={register({
                  required: 'Destination field is required',
                })}
                onChange={handleChange}
              />
              {Error(errors, 'destination')}

              <FormLabel htmlFor="for">Weight</FormLabel>
              <FormInput
                name="weight"
                type="number"
                value={weight}
                placeholder="Enter Weight"
                ref={register({
                  required: 'Destination field is required',
                  max: {
                    value: 300,
                    message: 'Weight capacity cannot exceed 300',
                  },
                })}
                onChange={handleChange}
              />
              {Error(errors, 'weight')}

              <FormLabel htmlFor="for">Phone Number</FormLabel>
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
                {loading ? <Spinner /> : 'Create'}
              </FormButton>
            </Form>
          </FormContent>
        </FormModel>
        <DisplayTable>
          <Table data={Row} />
        </DisplayTable>
      </ParcelContainer>
    </>
  );
};

export default CreateParcel;

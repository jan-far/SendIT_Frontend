import React, { useContext } from 'react';
import { Cancel, Save } from '@material-ui/icons';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './style.css';
import LocationSearchInput from '../../../Components/GooglePlace';
import FormHandler from '../../../Services/FormHandler';
import {
  FormModel,
  Form,
  FormContent,
  FormLabel,
  FormInput,
  CreateBtn,
  FormButton,
  Close,
  ParcelContainer,
  FabButtons,
} from './CreateElements';
import { Error } from '../../../Services/FormHandler/validateInfo';
import { user_post } from '../../../Services/utils/fetch';
import { UserContext } from '../../../Contexts/User';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
} from '@material-ui/core';
import NotificationToast from '../../../Components/Toast';


const Forms = ({ show, create, close }) => {
  const { Row, setLoading, setEmpty } = useContext(UserContext);

  const {
    Controller,
    register,
    values,
    reset,
    resetInput,
    errors,
    handleChange,
    handleSubmit,
    phone,
    control,
    setPhone,
  } = FormHandler();
  const { destination, recipient, location, weight } = values;

  const validatePhone = (phone) => {
    const compare = phone
      ? isValidPhoneNumber(phone)
        ? undefined
        : 'Invalid phone number'
      : 'Phone number required';
    return phone && compare;
  };

  const submitForm = async (data) => {
    setLoading(true);
    reset();
    resetInput();
    show();
    try {
      const req = await user_post(data, '/parcels');
      const response = await req.json();

      if (response === undefined || req.status === 400) {
        NotificationToast.error(`${response.message}`);
      } else {
        NotificationToast.success(`${response.message}`);
        Row.unshift(response.Parcel);
        setEmpty(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ParcelContainer>
        <CreateBtn onClick={show}>Create Order</CreateBtn>
        <FormModel create={create}>
          <FormContent>
            <Close
              onClick={() => {
                close();
                reset();
              }}
            >
              <Cancel color="secondary" fontSize="inherit" />
            </Close>

            <Form action="#" onSubmit={handleSubmit(submitForm)}>
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
              <Controller
                name="destination"
                as={
                  <LocationSearchInput
                    value={destination}
                    onChange={handleChange}
                    placeholder="Enter Destination"
                  />
                }
                rules={{ required: 'Destination field cannot be empty' }}
                control={control}
                defaultValue={destination}
              />
              {Error(errors, 'destination')}

              <FormLabel htmlFor="for">Weight (Kg)</FormLabel>
              <FormInput
                name="weight"
                type="number"
                value={weight}
                placeholder="Enter Weight"
                ref={register({
                  required: 'Destination field is required',
                  max: {
                    value: 300,
                    message: 'Weight capacity cannot exceed 300Kg',
                  },
                  min: {
                    value: 10,
                    message: 'Weight capacity must be above 10Kg',
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
                    placeholder="Enter Your Location"
                  />
                }
                rules={{ required: 'Location field cannot be empty' }}
                control={control}
                defaultValue=""
              />
              {Error(errors, 'location')}

              <FormButton type="submit">Create</FormButton>
            </Form>
          </FormContent>
        </FormModel>
      </ParcelContainer>
    </>
  );
};

export const EditParcel = ({ data, editing, closeEdit, submitEdit }) => {
  const {
    values,
    handleChange,
    handleSubmit,
    control,
    Controller,
    errors,
  } = FormHandler();
  const { destination } = values;

  const useStyles = makeStyles({
    dialogContent: {
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#010139',
    },
    g1: {
      gridColumn: 1,
    },
    g2: {
      gridColumn: 2,
      justifySelf: 'end',
    },
  });

  const classes = useStyles();

  return (
    <>
      <Dialog open={editing} onClose={closeEdit}>
        <DialogTitle style={{ textAlign: 'center' }}>Edit Parcel</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Form action="#" onSubmit={handleSubmit(submitEdit)}>
            <FormLabel htmlFor="for">Recipient</FormLabel>
            <FormInput
              name="recipient"
              type="recipient"
              value={data.recipient}
              disabled
            />

            <FormLabel htmlFor="for">Destination</FormLabel>
            <Controller
              name="destination"
              as={
                <LocationSearchInput
                  value={destination}
                  onChange={handleChange}
                  placeholder="Enter Destination"
                />
              }
              rules={{ required: 'Destination field cannot be empty' }}
              control={control}
              defaultValue={data.destination}
            />
            {Error(errors, 'destination')}

            <FormLabel htmlFor="for">Weight (Kg)</FormLabel>
            <FormInput
              name="weight"
              type="number"
              value={data.weight}
              disabled
            />

            <FormLabel htmlFor="for">Phone Number</FormLabel>
            <FormInput name="phone" type="number" value={data.phone} disabled />

            <FormLabel htmlFor="for">Location</FormLabel>
            <FormInput
              name="location"
              type="text"
              value={data.location}
              disabled
            />

            <FabButtons>
              <Fab
                className={classes.g1}
                size="small"
                onClick={() => closeEdit()}
                style={{ gridColumn: 1 }}
              >
                <Cancel />
              </Fab>
              <Fab
                className={classes.g2}
                size="small"
                type="submit"
                onClick={() => closeEdit()}
              >
                <Save />
              </Fab>
            </FabButtons>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Forms;

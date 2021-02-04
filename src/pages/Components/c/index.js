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
// import { getCookie } from '../../../Services/utils/helpers';
import '../Signup/style.css';
// import './Create.css';
import Script from 'react-load-script';
import { without } from 'loadsh';
import {
  Body,
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
  // Spinner,
  DisplayTable,
  Text,
  MobileView,
  Select,
  Option,
  DisplaySelected,
} from './CreateElements';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import UserNav from '../../../Components/UserNav';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormGroup,
} from '@material-ui/core';
import GoogleMaps from '../../../Components/GoogleMui';

toast.configure({
  autoClose: 5000,
  closeButton: true,
  draggable: false,
  position: 'bottom-left',
  hideProgressBar: true,
});

const CreateParcel = () => {
  const [Row, setRow] = useState([]),
    [create, setCreate] = useState(false),
    [isOpen, setIsOpen] = useState(false),
    // [username, setUsername] = useState(''),
    [parcel, setParcel] = useState(true),
    [select, setSelect] = useState(undefined),
    [editing, setEditing] = useState(false),
    [onEdit, setOnEdit] = useState(null);

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

  const columns = [
    {
      Header: 'Recipient',
      accessor: 'recipient',
    },
    {
      Header: 'Weight',
      accessor: 'weight',
    },
    {
      Header: 'Destination',
      accessor: 'destination',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: ({ row }) => <div>{row.original.weight * 2}</div>,
    },
    {
      Header: '',
      accessor: 'edit',
      Cell: ({ row }) => {
        return (
          <>
            <button
              onClick={() => (setOnEdit(row.index), setEditing(!editing))}
            >
              <FaEdit />
            </button>
          </>
        );
      },
    },
    {
      Header: '',
      accessor: 'cancel',
      Cell: ({ row }) => (
        <>
          <button onClick={() => Delete(row.original)}>
            <FaTrash />
          </button>
        </>
      ),
    },
  ];

  const field = [
    {
      Header: 'Recipient',
      accessor: 'recipient',
      // Cell: Edit,
    },
    {
      Header: 'Weight',
      accessor: 'weight',
      // Cell: Edit,
    },
    {
      Header: 'Destination',
      accessor: 'destination',
      // Cell: editing ? Edit : ({row}) => <>{row.original.destination}</>,
    },
    {
      Header: 'Location',
      accessor: 'location',
      // Cell: Edit,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      // Cell: Edit,
    },
  ];

  const [value, setValue] = React.useState(null);

  const EditDialog = ({
    isOpen,
    onDialogClose,
    onSubmitEdit,
    recordData,
    fields,
  }) => {
      // handleEdit = (key, value) => (
      //   console.log(value), setData({ ...data, [key]: value })
      // ),
      const val = value === null ? [] : value.description;

    return (
      <Dialog open={isOpen} onClose={onDialogClose}>
        <DialogTitle>Edit record</DialogTitle>
        <DialogContent>
          <FormGroup>
            {fields.map(({ accessor, Header }) =>
              accessor === 'destination' ? (
                <GoogleMaps
                  placeholder={recordData[accessor]}
                  value={value}
                  setValue={setValue}
                />
              ) : (
                <TextField
                  key={accessor}
                  defaultValue={recordData[accessor]}
                  label={Header}
                  disabled={accessor === 'destination' ? false : true}
                />
              )
            )}
          </FormGroup>
          <FormGroup>
            <Button
              onClick={() => (
                onSubmitEdit({ ...recordData, destination: val }),
                setValue(null)
              )}
            >
              Submit
            </Button>
            <Button onClick={() => onDialogClose()}>Cancel</Button>
          </FormGroup>
        </DialogContent>
      </Dialog>
    );
  };

  const Delete = (e) => {
    window.confirm('Are you sure you want to delete?')
      ? setRow(without(Row, e))
      : setRow(Row);
  };

  const onSubmit = (data) => {
    reset();
    resetInput();
    setCreate(!create);
    Row.unshift(data);
    try {
    } catch (error) {}
  };

  const handleEdit = (row) => {
    setEditing(!editing);
    const DataCopy = [...Row],
      editingIndex = DataCopy.findIndex(({ id }) => id === row.id);
    DataCopy.splice(editingIndex, 1, row);
    setRow(DataCopy);
    console.log(row);
  };

  const validatePhone = (phone) => {
    const compare = phone
      ? isValidPhoneNumber(phone)
        ? undefined
        : 'Invalid phone number'
      : 'Phone number required';
    return phone && compare;
  };

  const getUserData = async () => {
    try {
      const req = await get_request('/parcels');
      const response = await req.json();

      if (!req || response.rows === undefined) {
        toast.error('Error Occur while fetching parcels. Try Again...');
        setParcel(false);
        console.log(response);
      } else if (response.rows === [] || response.rowCount === 0) {
        toast.info('No parcel has been sent');
      } else {
        setRow([...response.rows]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showCreate = () => {
    setCreate(!create);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  function pFormat(data) {
    return (
      <div>
        <div>
          <details>
            <summary>Recipient</summary>
            <p>Name: {data.recipient}</p>
            <p>Phone Number: {data.phone}</p>
          </details>
        </div>
        <p>Weight: {data.weight}</p>
        <p>Location: {data.location}</p>
        <p>Destination: {data.destination}</p>
        <p>Phone: {data.phone}</p>
        <p>Price: {data.weight * 2}</p>
        <button
          onClick={(e) => (setOnEdit(parseInt(select)), setEditing(!editing))}
        >
          <FaEdit />
        </button>
        <button onClick={() => Delete(data)}>
          <FaTrash />
        </button>
      </div>
    );
  }

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  // useEffect(() => {
  //   EditDialog()
  // });

  return (
    <>
      <Body>
        {/* <EditDialog
          isOpen={editing}
          fields={field}
          recordData={Row.find((row, id) => id === onEdit) || {}}
          onDialogClose={() => setEditing(!editing)}
          onSubmitEdit={handleEdit}
        /> */}
        <UserNav
          title="Parcel Portal"
          first="Dashboard"
          toFirst="/dashboard"
          // second="Dashboard"
          // third="My Account"
          // toThird="/dashboard"
          // username={username}
          isOpen={isOpen}
          toggle={toggle}
        />
        <ParcelContainer>
          <Title>ORDER AND DELIVERIES</Title>
          <CreateBtn onClick={showCreate}>Create Order</CreateBtn>
          {/* <FormModel create={create}>
            <FormContent>
              <Close
                onClick={() => {
                  showCreate();
                  reset();
                  resetInput();
                }}
              >
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
          </FormModel> */}
          <DisplayTable>
            {Row.length !== 0 ? (
              <>
                {parcel ? (
                  <Table
                    data={Row}
                    columns={columns}
                    edit={editing}
                    index={onEdit}
                  />
                ) : (
                  <Text>NO PARCEL ORDER HAS BEEN MADE</Text>
                )}
              </>
            ) : (
              <Text>NO PARCEL ORDER HAS BEEN MADE</Text>
            )}
          </DisplayTable>

          {/* Handling Mobile View of 768px */}
          {/* <MobileView>
            <Select onChange={handleSelect}>
              select ? <Option>Select</Option> :
              {Row.map((row, i) => {
                return (
                  <Option key={i} value={i}>
                    {i + 1}
                  </Option>
                );
              })}
            </Select>
            <DisplaySelected>
              {Row.length !== 0 ? (
                <> {Row[select] ? pFormat(Row[select]) : ''} </>
              ) : (
                <Text>NO PARCEL ORDER HAS BEEN MADE</Text>
              )}
            </DisplaySelected>
          </MobileView> */}
        </ParcelContainer>
      </Body>
    </>
  );
};

export default CreateParcel;

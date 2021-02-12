import React from 'react';
import { Cancel, Save } from '@material-ui/icons';
import LocationSearchInput from '../../../../Components/GooglePlace';
import FormHandler from '../../../../Services/FormHandler';
import { Form, FormLabel, FormInput, FabButtons } from './DashboardElement';
import { Error } from '../../../../Services/FormHandler/validateInfo';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
  Select,
} from '@material-ui/core';

export const UpdateParcel = ({ data, editing, closeEdit, submitEdit }) => {
  const {
    values,
    handleChange,
    handleSubmit,
    control,
    Controller,
    errors,
  } = FormHandler();
  const { location } = values;

  const useStyles = makeStyles({
    dialogContent: {
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4e088f',
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
            <FormInput
              name="recipient"
              type="recipient"
              value={data.destination}
              disabled
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
            <Controller
              name="location"
              as={
                <LocationSearchInput
                  value={location}
                  onChange={handleChange}
                  placeholder="Current Parcel Location"
                />
              }
              rules={{ required: 'Location field cannot be empty' }}
              control={control}
              defaultValue={data.destination}
            />

            <FormLabel htmlFor="for">Status</FormLabel>
            <Controller
              name="status"
              as={
                <Select
                  native
                  variant="outlined"
                  inputProps={{
                    name: 'status',
                    id: 'status',
                  }}
                  style={{ backgroundColor: 'whitesmoke', color: 'black' }}
                >
                  <option value="processing">Processing</option>
                  <option value="pending">Pending</option>
                </Select>
              }
              control={control}
              defaultValue={data.status}
            />

            <FabButtons>
              <Fab
                className={classes.g1}
                size="small"
                onClick={() => closeEdit()}
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

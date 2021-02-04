import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete, Edit, Save } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import UserNav from '../../../Components/UserNav';
import { CreateParcelContext } from '../../../Contexts/CreateParcel';
import { UserContext } from '../../../Contexts/User';

const Parcels = ({ data, handleEdit }) => {
  return (
    <>
      <Grid container spacing={2} justify="center">
        {data.map((parcel) => (
          <Grid item xs={9} sm={5} md={6} key={parcel.id}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Recipient: {parcel.recipient.toUpperCase()}
                  </Typography>
                  <Typography component="p">
                    <FormLabel>Destination: </FormLabel>
                    {parcel.destination}
                  </Typography>
                  <Typography component="p">
                    <FormLabel>Weight: </FormLabel>
                    {parcel.weight}
                  </Typography>
                  <Typography component="p">
                    <FormLabel>Location:</FormLabel> {parcel.location}
                  </Typography>
                  <Typography component="p">
                    <FormLabel>Phone No.: </FormLabel>
                    {parcel.phone}
                  </Typography>
                  <Typography component="p">
                    <FormLabel>Price:</FormLabel> ${parcel.weight * 2}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  background:
                    'linear-gradient(to right bottom, #0095, #0035), linear-gradient(to left top, #0099, #3001)',
                }}
              >
                <Button
                  size="small"
                  color="green"
                  onClick={(e) => handleEdit(parcel.id)}
                >
                  <Edit />
                </Button>
                <Button size="small" color="secondary">
                  <Delete />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const EditParcel = ({ data, editing, closeEdit }) => {
  return (
    <>
      <Dialog open={editing} onClose={closeEdit}>
        <DialogTitle>Edit Parcel</DialogTitle>
        <DialogContent>{console.log(data)}
        <FormGroup>
        </FormGroup></DialogContent>
        <DialogActions>
          <Fab size="small">
            <Save />
          </Fab>
        </DialogActions>
      </Dialog>
    </>
  );
};

const CreateParcel = () => {
  const { Row, empty } = useContext(UserContext);
  const { isOpen, editing, setEditing, closeEdit, toggle } = useContext(
    CreateParcelContext
  );
  const [parcelToEdit, setParcelToEdit] = useState({})

  const handleEdit = (id) => {
    setEditing(!editing);
    const editRow = Row.find((row) => row.id === id);

    setParcelToEdit({...editRow})
  };

  return (
    <>
      <EditParcel data={parcelToEdit} editing={editing} closeEdit={closeEdit} />
      <UserNav
        first="Dashboard"
        toFirst="/dashboard"
        isOpen={isOpen}
        toggle={toggle}
      />
      {empty ? (
        <>
          <Typography variant="h5" align="center">
            NO PARCEL ORDER HAS BEEN MADE
          </Typography>
        </>
      ) : (
        <Parcels data={Row} handleEdit={handleEdit} />
      )}
    </>
  );
};

export default CreateParcel;

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  FormLabel,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import NotificationToast from '../../../Components/Toast';
import UserNav from '../../../Components/UserNav';
import withSpinner from '../../../Components/withSpinner';
import { CreateParcelContext } from '../../../Contexts/CreateParcel';
import { UserContext } from '../../../Contexts/User';
import { delete_parcel, update_parcel } from '../../../Services/utils/fetch';
import Forms, { EditParcel } from './form';

const GetParcels = ({ data, edit, cancel }) => {
  const useStyles = makeStyles({
    card: {
      display: 'grid',
      gridTemplateRows: '.9fr .2fr',
      minHeight: '300px',
      border: '1px solid #0093',
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} justify="center">
        {data.map((parcel) => (
          <Grid item xs={9} sm={5} md={6} key={parcel.id}>
            <Card className={classes.card}>
              <CardActionArea style={{ gridRow: 1 }}>
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
                  gridRow: 2,
                  background:
                    'linear-gradient(to right bottom, #0095, #0035), linear-gradient(to left top, #0099, #3001)',
                }}
              >
                <Button
                  size="small"
                  color="inherit"
                  onClick={(e) => edit(parcel.id)}
                >
                  <Edit />
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={(e) => cancel(parcel.id)}
                >
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

const GetParcelsWithSpinner = withSpinner(GetParcels);

const Empty = () => {
  return (
    <>
      <Typography variant="h5" align="center">
        NO PARCEL ORDER HAS BEEN MADE
      </Typography>
    </>
  );
};

const EmptyWithSpinner = withSpinner(Empty);

const DeleteParcel = async (id, Row, setLoading, setEmpty) => {
  setLoading(true);
  const parcelToDeleteId = Row.findIndex((row) => row.id === id);
  const ask = window.confirm('Are you sure you want to delete this parcel?');

  if (ask) {
    if (Row.length === 1) {
      setEmpty(true);
    }

    try {
      const req = await delete_parcel(`/parcels/${id}/cancel`);
      const response = await req.json();

      if (response === undefined || req.status === 400) {
        NotificationToast.error(`${response.message}`);
        setLoading(false);
      } else {
        NotificationToast.success(`${response.message}`);
        Row.splice(parcelToDeleteId, 1);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    setLoading(false);
  }
};

const CreateParcel = () => {
  const { Row, setEmpty, isLoading, user, setLoading } = useContext(
    UserContext
  );
  const [selectedParcel, setSelected] = useState({});
  const {
    isOpen,
    editing,
    create,
    show,
    setEditing,
    closeEdit,
    toggle,
  } = useContext(CreateParcelContext);

  const handleEdit = (id) => {
    setEditing(!editing);
    const editRow = Row.find((row) => row.id === id);
    setSelected({ ...editRow });
  };

  const submitEdit = async (data) => {
    setLoading(true);
    const id = selectedParcel.id;
    const updateDest = { ...selectedParcel, destination: data.destination };

    const parcelToUpdate = Row.findIndex((row) => row.id === id);

    try {
      const req = await update_parcel(data, `/parcels/${id}/destination`);
      const response = await req.json();

      if (response === undefined || req.status === 400) {
        NotificationToast.error(`${response.message}`);
        setLoading(false);
      } else {
        NotificationToast.success(`${response.message}`);
        Row.splice(parcelToUpdate, 1, updateDest);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Record = ({ data }) => {
    let pending = 0;
    let delivered = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].status !== 'delivered') {
        pending += 1;
      } else {
        delivered += 1;
      }
    }

    return (
      <>
        <Typography variant="caption">Total Orders: {data.length}</Typography>
        {/* <br></br> */} | &nbsp;
        <Typography variant="caption">Total Pending: {pending}</Typography>
        {/* <br></br> */} | &nbsp;
        <Typography variant="caption">Total Delivered: {delivered}</Typography>
      </>
    );
  };

  return (
    <>
      <EditParcel
        data={selectedParcel}
        editing={editing}
        closeEdit={closeEdit}
        submitEdit={submitEdit}
      />

      <UserNav
        title="Parcel Order"
        first="Dashboard"
        toFirst="/dashboard"
        isOpen={isOpen}
        toggle={toggle}
        username={user.firstname}
      />

      <Record data={Row} />

      <Forms create={create} show={show} close={show} />

      <Container>
        {Row.length === 0 ? (
          <>
            <EmptyWithSpinner isLoading={isLoading} />
          </>
        ) : (
          <>
            <GetParcelsWithSpinner
              isLoading={isLoading}
              data={Row}
              edit={handleEdit}
              cancel={(e) => DeleteParcel(e, Row, setLoading, setEmpty)}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default CreateParcel;

import React, { useContext, useState } from 'react';
import UserNav from '../../../../Components/UserNav';
import { Pie } from 'react-chartjs-2';
import { AdminContext } from '../../../../Contexts/Admin';
import withSpinner from '../../../../Components/withSpinner';
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
import { AdminContainer, Column1, Column2, Details } from './DashboardElement';
import { Hr } from '../../../Components/Dashboard/DashboardElements';
import { Check, Edit } from '@material-ui/icons';
import { UpdateParcel } from './form';
import { update_parcel } from '../../../../Services/utils/fetch';
import NotificationToast from '../../../../Components/Toast';

const AllUserParcels = ({ edit, confrimParcel }) => {
  const { Row, users, isLoading } = useContext(AdminContext);

  let user = [];
  let userParcel = {};
  let parcel;

  //  Count the numbers of registered users excluding admin(s)
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === 2) {
      continue;
    } else if (user.includes(users[i].email)) {
      continue;
    } else {
      user.unshift(users[i].email);
    }
  }

  users.forEach((owner) => {
    Row.forEach((row) => {
      if (owner.id === row.owner_id) {
        if (Object.keys(userParcel).includes(owner.email)) {
          parcel.push(row);
          userParcel[owner.email] = parcel;
        } else {
          parcel = [];
          parcel.push(row);
          userParcel[owner.email] = parcel;
        }
      }
    });
  });

  const Parcels = () => {
    const useStyles = makeStyles({
      card: {
        display: 'grid',
        gridTemplateRows: '.9fr .2fr',
        minHeight: '20rem',
        border: '1px solid #0093',
      },
    });

    const classes = useStyles();

    return (
      <Container>
        <Typography
          variant="h5"
          style={{ textAlign: 'center', color: 'blue', margin: 6 }}
        >
          Registered Users Parcel Order
        </Typography>
        <Hr />
        {Object.keys(userParcel).map((email) => (
          <Details key={email}>
            <Typography
              variant="h6"
              style={{ marginTop: 15, textAlign: 'center' }}
            >
              User: {email.toUpperCase()}
            </Typography>
            <Grid
              container
              spacing={2}
              justify="center"
              style={{ marginBottom: 10, padding: 10 }}
            >
              {userParcel[email].map((parcel) => (
                <>
                  <Grid item xs={9} sm={5} md={6} key={parcel.id}>
                    <Card className={classes.card}>
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
                          <Typography
                            component="em"
                            style={{ marginBottom: '10px' }}
                          >
                            <Typography component="span">Status:</Typography>{' '}
                            {parcel.status}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions
                        style={{
                          gridRow: 2,
                          background:
                            'linear-gradient(to left top, #0095, #0035), linear-gradient(to left bottom, #0099, #3001)',
                        }}
                      >
                        <Button
                          size="small"
                          color="inherit"
                          onClick={() => edit(parcel.id)}
                        >
                          <Edit />
                        </Button>
                        <Button
                          size="small"
                          style={{
                            color: 'darkgreen',
                            backgroundColor: '#fffff0',
                          }}
                          onClick={() => confrimParcel(parcel.id)}
                        >
                          <Check />
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>
          </Details>
        ))}
      </Container>
    );
  };

  const ParcelWithSpinner = withSpinner(Parcels);

  return (
    <>
      <ParcelWithSpinner isLoading={isLoading} />
    </>
  );
};

const AdminDashboard = () => {
  const {
    Row,
    isLoading,
    setLoading,
    editing,
    setEditing,
    closeEdit,
  } = useContext(AdminContext);
  const [selectedParcel, setSelectedParcel] = useState({});

  let processing = 0;
  let pending = 0;
  let delivered = 0;

  //  Get the stats of parcels by status
  for (let i = 0; i < Row.length; i++) {
    if (Row[i].status === 'processing') {
      processing += 1;
    } else if (Row[i].status !== 'delivered') {
      pending += 1;
    } else {
      delivered += 1;
    }
  }

  const handleEdit = (id) => {
    setEditing(!editing);
    const editRow = Row.find((row) => row.id === id);
    return setSelectedParcel({ ...editRow });
  };

  const submitEdit = async (data) => {
    setLoading(true);
    const id = selectedParcel.id;
    const update = { ...selectedParcel, ...data };
    const parcelToUpdate = Row.findIndex((row) => row.id === id);

    if (
      data.status !== selectedParcel.status ||
      data.location !== selectedParcel.location
    ) {
      if (data.status !== selectedParcel.status) {
        try {
          const req = await update_parcel(data, `/parcels/${id}/status`);
          const response = await req.json();

          if (response === undefined || req.status !== 200) {
            NotificationToast.error(`${response.message}`);
            setLoading(false);
          } else {
            NotificationToast.success(`${response.message}`);
            Row.splice(parcelToUpdate, 1, update);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (data.location !== selectedParcel.location) {
        try {
          const req = await update_parcel(
            data,
            `/parcels/${id}/presentLocation`
          );
          const response = await req.json();

          if (response === undefined || req.status !== 200) {
            NotificationToast.error(`${response.message}`);
            setLoading(false);
          } else {
            NotificationToast.success(`${response.message}`);
            Row.splice(parcelToUpdate, 1, update);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      NotificationToast.success(`:smile`);
      setLoading(false);
    }
  };

  const confrimParcel = async (id) => {
    setLoading(true);
    const parcelToConfirm = Row.find((row) => row.id === id);
    const data = { ...parcelToConfirm, status: 'delivered' };

    const ask = window.confirm('Are you sure parcel has been delivered?');

    console.log(parcelToConfirm);

    if (ask) {
      try {
        const req = await update_parcel(data, `/parcels/${id}/status`);
        const response = await req.json();

        if (response === undefined || req.status !== 200) {
          NotificationToast.error(`${response.message}`);
          setLoading(false);
        } else {
          NotificationToast.success(`${response.message}`);
          Row.splice(parcelToConfirm, 1, data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading(false);
    }
  };

  const parcelState = {
    labels: ['processing', 'pending', 'delivered'],
    datasets: [
      {
        label: 'Parcel',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          // '#00A6B4',
          // '#6800B4'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          // '#003350',
          // '#35014F'
        ],
        data: [processing, pending, delivered],
      },
    ],
  };

  let width = window.innerWidth;
  window.addEventListener('resize', () => {
    width = window.innerWidth;
  });

  const ParcelChart = () => {
    return (
      <Pie
        height={width <= 968 ? (width <= 768 ? 120 : 140) : 200}
        data={parcelState}
        options={{
          title: {
            display: true,
            text: 'Parcel Status Chart',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    );
  };

  const ParcelChartWithSpinner = withSpinner(ParcelChart);

  return (
    <>
      <UserNav
        title="Admin Portal"
        username="Admin"
      />
      <UpdateParcel
        data={selectedParcel}
        editing={editing}
        closeEdit={closeEdit}
        submitEdit={submitEdit}
      />
      <AdminContainer>
        <Column1>
          {/* <Typography varient="caption">Total Order: {Row.length}</Typography> */}
          <ParcelChartWithSpinner isLoading={isLoading} />
        </Column1>
        <Column2>
          <AllUserParcels edit={handleEdit} confrimParcel={confrimParcel} />
        </Column2>
      </AdminContainer>
    </>
  );
};

export default AdminDashboard;

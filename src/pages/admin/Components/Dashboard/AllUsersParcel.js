import React, { useContext } from 'react';
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
import { Check, Edit } from '@material-ui/icons';
import { Details } from './DashboardElement';
import { Hr } from '../../../Components/Dashboard/DashboardElements';
import { withTheme } from 'styled-components';

const AllUsersParcel = ({ theme, edit, confrimParcel }) => {
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
          style={{
            textAlign: 'center',
            color: theme.mode === 'light' ? 'darkblue' : '#000083',
            margin: 6,
            fontWeight: 450,
          }}
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
                <Grid item xs={9} sm={6} md={6} key={parcel.id}>
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

export default withTheme(AllUsersParcel);

import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from '@material-ui/core';
import { DashboardContainer, Field, Hr } from './DashboardElements';
import UserNav from '../../../Components/UserNav';
import { useContext } from 'react';
import { DashboardContext } from '../../../Contexts/Dashboard';
import withSpinner from '../../../Components/withSpinner';
import { UserContext } from '../../../Contexts/User';
import { Button, RouteButton } from '../../../Components/ButtonElements';

const Posts = ({ data }) => {
  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      <Grid container spacing={2} justify="center">
        {data.map((post) => (
          <Grid item xs={9} sm={5} md={6} key={post.id}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Recipient: {post.recipient.toUpperCase()}
                  </Typography>
                  <Typography component="p">
                    Destination: {post.destination}
                  </Typography>
                  <Typography component="p">Weight: {post.weight}</Typography>
                  <Typography component="p">
                    Location: {post.location}
                  </Typography>
                  <Typography component="p">Phone No.: {post.phone}</Typography>
                  <Typography component="p">
                    Price: ${post.weight * 2}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const PostWithSpinner = withSpinner(Posts);

const Dashboard = () => {
  const { Row, empty, user, isLoading } = useContext(UserContext);
  const { show, showProfile, isOpen, toggle } = useContext(DashboardContext);

  const ProfileData = ({ open, close }) => {
    const fullname = `${user.firstname}  ${user.lastname}`;
    const useStyles = makeStyles({
      g1: {
        gridColumn: 1,
      },
      g2: {
        gridColumn: 2,
      },
    });

    const classes = useStyles();
    return (
      <>
        <Dialog open={open} onClose={close}>
          <DialogTitle style={{ textAlign: 'center', background: 'wheat' }}>
            My Profile
          </DialogTitle>
          <DialogContent>
            <Field>
              <Typography className={classes.g1}>Full Name: </Typography>
              <Typography className={classes.g2}>{fullname}</Typography>
            </Field>
            <Hr />
            <Field>
              <Typography className={classes.g1}>Email: </Typography>
              <Typography className={classes.g2}>{user.email}</Typography>
            </Field>
            <Hr />
            <Field>
              <Typography className={classes.g1}>Phone: </Typography>
              <Typography className={classes.g2}>{user.phone}</Typography>
            </Field>
            <Hr />
            <Field>
              <Typography className={classes.g1}>Location: </Typography>
              <Typography className={classes.g2}>{user.location}</Typography>
            </Field>
            <Hr />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return (
    <>
      <UserNav
        title="Dashboard"
        isOpen={isOpen}
        first="Create Parcel"
        toFirst="/create"
        toggle={toggle}
      />
      <DashboardContainer>
        <Button primary="true" dark="true" onClick={showProfile}>
          My Profile
        </Button>
        <ProfileData open={show} close={showProfile} />
        <Container>
          {empty ? (
            <Typography
              variant="h5"
              align="center"
              style={{ marginTop: 25, color: 'wheat' }}
            >
              NO PARCEL ORDER HAS BEEN MADE
            </Typography>
          ) : (
            <PostWithSpinner isLoading={isLoading} data={Row} />
          )}
        </Container>
        <RouteButton primary="true" dark="true" to="/create">
          Send New Parcel
        </RouteButton>
      </DashboardContainer>
    </>
  );
};

export default withSpinner(Dashboard);

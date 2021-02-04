import React from 'react';
import { FaTimes } from 'react-icons/fa';

import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@material-ui/core';

import {
  DashboardContainer,
  Profile,
  UserDash,
  SendParcel,
  ProfileInfo,
  UserTable,
  Field,
  Close,
  Hr,
} from './DashboardElements';
import UserNav from '../../../Components/UserNav';
import { useContext } from 'react';
import { DashboardContext } from '../../../Contexts/Dashboard';
import withSpinner from '../../../Components/withSpinner';
import { UserContext } from '../../../Contexts/User';

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
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const PostWithSpinner = withSpinner(Posts);

const Dashboard = () => {
  const { Row, empty, data, isLoading } = useContext(UserContext);
  const { show, showProfile, isOpen, toggle } = useContext(DashboardContext);

  const profileInfo = () => {
    const fullname = `${data.firstname}  ${data.lastname}`;
    return (
      <>
        <Field>Full Name: {fullname}</Field>
        <Hr />
        <Field>Email: {data.email}</Field>
        <Hr />
        <Field>Phone: {data.phone}</Field>
        <Hr />
        <Field>Location: {data.location}</Field>
      </>
    );
  };

  return (
    <>
      <UserNav
        title="Dashboard"
        isOpen={isOpen}
        toggle={toggle}
        username={data.firstname}
      />
      <DashboardContainer>
        <Profile onClick={showProfile}>My Profile</Profile>
        <UserDash show={show} onClick={showProfile}>
          <ProfileInfo>
            <Close onClick={showProfile}>
              <FaTimes />
            </Close>
            {profileInfo()}
          </ProfileInfo>
        </UserDash>
        <UserTable>
          {empty ? (
            <div>NO PARCEL ORDER HAS BEEN MADE! </div>
          ) : (
            <PostWithSpinner isLoading={isLoading} data={Row} />
            // <Table data={Row} columns={columns} />
          )}
        </UserTable>
        <SendParcel to="/create">Send New Parcel</SendParcel>
      </DashboardContainer>
      )
    </>
  );
};

export default withSpinner(Dashboard);

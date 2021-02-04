import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../Components/LoadingPage';
import CreateParcelProvider from '../Contexts/CreateParcel';
import DashboardProvider from '../Contexts/Dashboard';

const LoadComponents = (name) => {
  return lazy(() => import(`./Components/${name}`));
};

const Homepage = LoadComponents('HomePage');
const SignInPage = LoadComponents('Signin');
const SignUpPage = LoadComponents('Signup');
const Dashboard = LoadComponents('Dashboard');
const CreateParcel = LoadComponents('CreateParcel');


const Pages = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<Loading />}>
            <Homepage />
          </Suspense>
        </Route>

        <Route exact path="/signin">
          <Suspense fallback={<Loading />}>
            <SignInPage />
          </Suspense>
        </Route>

        <Route exact path="/signup">
          <Suspense fallback={<Loading />}>
            <SignUpPage />
          </Suspense>
        </Route>

        <Route exact path="/dashboard">
          <Suspense fallback={<Loading />}>
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          </Suspense>
        </Route>

        <Route exact path="/create">
          <Suspense fallback={<Loading />}>
            <CreateParcelProvider>
              <CreateParcel />
            </CreateParcelProvider>
          </Suspense>
        </Route>
      </Switch>
    </>
  );
};

export default Pages;

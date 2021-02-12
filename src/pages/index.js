import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../Components/LoadingPage';
import CreateParcelProvider from '../Contexts/CreateParcel';
import DashboardProvider from '../Contexts/Dashboard';
import AdminRoute from '../HOC/AdminRouteWrapper';
import PrivateRoute from '../HOC/PrivateRouteWrapper';

const LoadComponents = (name) => {
  return lazy(() => import(`./Components/${name}`));
};

const AdminLoadComponents = (name) => {
  return lazy(() => import(`./admin/Components/${name}`));
};

const Homepage = LoadComponents('HomePage');
const SignInPage = LoadComponents('Signin');
const SignUpPage = LoadComponents('Signup');
const Dashboard = LoadComponents('Dashboard');
const CreateParcel = LoadComponents('CreateParcel');

const AdminAuth = AdminLoadComponents('SignIn');
const AdminDashboard = AdminLoadComponents('Dashboard');

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
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            </Suspense>
          </PrivateRoute>
        </Route>

        <Route exact path="/create">
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <CreateParcelProvider>
                <CreateParcel />
              </CreateParcelProvider>
            </Suspense>
          </PrivateRoute>
        </Route>

        <Route exact path="/admin">
          <Suspense fallback={<Loading />}>
            <AdminAuth />
          </Suspense>
        </Route>

        <Route path="/admin/dashboard">
          <Suspense fallback={<Loading />}>
            <AdminRoute>
              <CreateParcelProvider>
                <AdminDashboard />
              </CreateParcelProvider>
            </AdminRoute>
          </Suspense>
        </Route>
      </Switch>
    </>
  );
};

export default Pages;

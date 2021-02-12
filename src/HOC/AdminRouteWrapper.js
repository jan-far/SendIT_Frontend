import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AdminContext } from '../Contexts/Admin';
import { AdminGetUser } from '../Services/authService';
import { clearCookie } from '../Services/utils/helpers';

const AdminRoute = ({ children, ...rest }) => {
  const { admin, setAdmin } = useContext(AdminContext);

  useEffect(() => {
    const Users = async () => {
      try {
        const req = await AdminGetUser();

        if (req.success) {
          return setAdmin({ ...req.admin });
        } else {
          clearCookie();
          setAdmin(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    Users();
  }, [setAdmin]);


  return (
    <Route
      {...rest}
      render={({ location }) =>
        admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;

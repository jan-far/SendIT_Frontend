import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../Contexts/User';
import { getUser } from '../Services/authService';
import { clearCookie } from '../Services/utils/helpers';

const PrivateRoute = ({ children, ...rest }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const User = async () => {
      try {
        const req = await getUser();
        
        if (req.success) {
          return setUser({ ...req.user });
        } else {
          clearCookie()
          return setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    User();
  }, [setUser]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

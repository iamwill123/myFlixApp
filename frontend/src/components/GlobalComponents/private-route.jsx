import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { localStore } from '../../helpers/localStorageClient';

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStore.isLoggedIn() ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/myFlixApp',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, ...rest }) => {
  //! check if user is authenticated and than render the children that is the dashboard in the app.js, if not than redirect to login page
  const { isAuthenticated, user } = useAuth0();
  //! if use is authenticated get the user
  const isUserAuthenticated = isAuthenticated && user;

  return (
    <Route
      {...rest}
      render={() => {
        return isUserAuthenticated ? children : <Redirect to="/login" />;
      }}
    ></Route>
  );
};
export default PrivateRoute;

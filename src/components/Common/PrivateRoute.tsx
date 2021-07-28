import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';


export const PrivateRoute = (props: RouteProps) => {
  // check if user is login or
  // if yes, show router
  // otherwise, redirect to login page

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
};

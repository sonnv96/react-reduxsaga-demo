import { Button } from '@material-ui/core';
import cityApi from 'api/citiApi';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { authActions } from 'features/auth/authSlice';
import { LoginPage } from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/admin">
            <AdminLayout />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';
import Main from '@layouts/Main';

import Authentification from '@pages/Authentification';
import Testing from '@pages/Testing';
import Problems from '@pages/Problems';
import LegalEntities from '@pages/LegalEntities';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { authenticationActions } from '@bus/authentication/actions';
import Police from '@pages/Police/Police';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticationActions.checkAsync());
  }, []);
  return (
    <Box sx={{ padding: '16px', height: '100%' }}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Authentification />
            </PublicRoute>
          }
        />
        <Route
          path="/police"
          element={
            <PublicRoute>
              <Police />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<LegalEntities />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/tests" element={<Testing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;

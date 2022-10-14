import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getAuthentication } from '@bus/authentication/selector';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { isAuth } = useSelector(getAuthentication);
  if (!localStorage.getItem('@admin_ACCESS_TOKEN')) {
    return <Navigate to={'/login'} />;
  } else if (!isAuth) {
    return <div>Loading....</div>;
  }

  return children;
};

export default PrivateRoute;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ModalProvider } from 'react-modal-hook';
import { Provider } from 'react-redux';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications } from 'react-notifications-component';

import theme from '@theme/theme';
import store from '@redux/store';

import App from '@routes/App';

import './index.scss';

const rootElement = document.getElementById('app');

if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <BrowserRouter>
          <ReactNotifications />
          <App />
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  </Provider>,
);

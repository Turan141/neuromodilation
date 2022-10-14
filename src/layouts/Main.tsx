import React from 'react';

import { book, bookProps } from '@routes/book';
import logoText from '@assets/logo/text.svg';

import { Box, List, Toolbar, useTheme, Button } from '@mui/material';
import ListItemLink from '@components/ListItemLink';

import styles from './Main.module.scss';
import { Outlet } from 'react-router-dom';
import { authenticationActions } from '@bus/authentication/actions';
import { useDispatch } from 'react-redux';

const Main = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const logout = () => dispatch(authenticationActions.logoutAsync());

  const drawer = (
    <>
      <Toolbar>
        <img
          src={logoText}
          alt="logoText"
          style={{ width: '140px', opacity: 0.44 }}
        />
      </Toolbar>
      <List>
        {book.map(({ id, title, icon, to }: bookProps) => (
          <ListItemLink key={id} to={to} primary={title} icon={icon} />
        ))}
      </List>
      <Button onClick={logout} className={styles.cancelButton}>
        Выйти
      </Button>
    </>
  );

  return (
    <Box className={styles.root}>
      <Box
        className={styles.drawer}
        sx={{ background: theme.palette.background.default }}
      >
        {drawer}
      </Box>
      <Box className={styles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;

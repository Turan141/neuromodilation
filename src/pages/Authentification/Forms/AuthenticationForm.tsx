import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import styles from './Forms.module.scss';
import { authenticationActions } from '@bus/authentication/actions';

type FormData = {
  login: string;
  password: string;
};

interface AuthenticationFormProps {
  showRemember: boolean;
  setShowRemember: any;
}

const AuthenticationForm: FC<AuthenticationFormProps> = ({
  showRemember,
  setShowRemember,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    return () => reset();
  }, []);

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClickShowRemember = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setShowRemember(!showRemember);
  };

  const onAuthenticationSubmit = handleSubmit((data) => {
    dispatch(authenticationActions.authenticationAsync(data));
  });

  return (
    <form className={styles.form} onSubmit={onAuthenticationSubmit}>
      <Typography className={styles.title} variant={'h5'}>
        Вход
      </Typography>
      <TextField
        {...register('login', { required: true })}
        fullWidth
        label="Логин"
        error={!!errors.login}
      />
      <TextField
        sx={{ marginTop: '15px' }}
        {...register('password', { required: true })}
        fullWidth
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        error={!!errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={styles.input}
        fullWidth
        type={'submit'}
        variant="contained"
        size={'large'}
      >
        войти
      </Button>
      {!showRemember && (
        <Typography
          className={styles.remember}
          color={theme.palette.primary.main}
          onClick={handleClickShowRemember}
        >
          Забыли пароль?
        </Typography>
      )}
    </form>
  );
};

export default AuthenticationForm;

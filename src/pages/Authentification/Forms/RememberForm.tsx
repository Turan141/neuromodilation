import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, TextField, Typography, useTheme } from '@mui/material';

import styles from './Forms.module.scss';

type FormData = {
  email: string;
};

const RememberForm = () => {
  const theme = useTheme();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    return () => reset();
  }, []);

  const onRememberSubmit = handleSubmit((data) => console.log(data));

  return (
    <form className={styles.form} onSubmit={onRememberSubmit}>
      <Typography className={styles.rememberTitle} variant={'subtitle1'}>
        Восстановление пароля
      </Typography>
      <Typography
        className={styles.rememberTitle}
        variant={'body2'}
        color={theme.palette.grey['700']}
      >
        Если вас есть учетная запись, вы получите ссылку для сброса пароля на
        эту электронную почту
      </Typography>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            className={styles.input}
            fullWidth
            label="E-mail"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            error={!!errors.email}
          />
        )}
        name="email"
      />
      <Button
        className={styles.input}
        fullWidth
        type={'submit'}
        variant="contained"
        size={'large'}
      >
        отправить
      </Button>
    </form>
  );
};

export default RememberForm;

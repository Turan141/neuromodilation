import React, { useState } from 'react';

import logoText from '@assets/logo/text.svg';
import logoWhite from '@assets/logo/white.svg';
import wavyLinesBig from '@assets/images/wavyLinesBig.svg';
import wavyLinesSmall from '@assets/images/wavyLinesSmall.svg';

import { Box, Typography, useTheme } from '@mui/material';
import AuthenticationForm from '@pages/Authentification/Forms/AuthenticationForm';
import RememberForm from '@pages/Authentification/Forms/RememberForm';

import styles from './Authentification.module.scss';

const Authentification = () => {
  const [showRemember, setShowRemember] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <Box className={styles.root}>
      <Box
        className={styles.section}
        sx={{ background: theme.palette.background.default }}
      >
        <Box className={styles.logo}>
          <img src={logoWhite} alt="logoImage" />
          <img src={logoText} alt="logoText" />
        </Box>
        <img
          className={styles.wavyLinesBig}
          src={wavyLinesBig}
          alt={'wavyLinesBig'}
        />
        <Typography className={styles.info}>
          2022 Институт психологии управления
        </Typography>
      </Box>
      <Box className={styles.section}>
        <AuthenticationForm
          showRemember={showRemember}
          setShowRemember={setShowRemember}
        />
        {showRemember && <RememberForm />}
        <img
          className={styles.wavyLinesSmall}
          src={wavyLinesSmall}
          alt={'wavyLinesSmall'}
        />
      </Box>
    </Box>
  );
};

export default Authentification;

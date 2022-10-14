import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => (
  <Box
    sx={{
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loader;

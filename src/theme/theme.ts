import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

const theme = createTheme(
  {
    typography: {
      h4: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#505d68',
      },
    },
    palette: {
      background: {
        default:
          'linear-gradient(180deg, #3980FD 0%, #3980FD 0.01%, #6692DB 100%)',
      },
      primary: {
        main: '#3980FD',
        dark: '#2670F2',
        light: '#6099FF',
      },
      error: {
        main: '#E72828',
        dark: '#C91919',
      },
      grey: {
        100: '#EEEEF6',
        300: '#E0E0ED',
        400: '#CDD0DE',
        600: '#7C87A5',
        700: '#57617D',
      },
      text: {
        primary: '#000000',
        secondary: 'rgba(16, 33, 62, 0.62)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background:
              'linear-gradient(180deg, #3980FD 0%, #3980FD 0.01%, #6692DB 100%)',
            boxShadow:
              '0px 4px 4px rgba(50, 50, 71, 0.08), 0px 4px 8px rgba(50, 50, 71, 0.06)',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            transition: '200ms',
            borderRadius: '16px',
            '&:hover': {
              backgroundColor: '#2670F2',
              transition: '200ms',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: '40px',
            color: '#FFFFFF',
          },
        },
      },
    },
  },
  ruRU,
);

export default theme;

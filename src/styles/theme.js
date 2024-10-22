import { createTheme } from '@mui/material/styles';


const fedexPurple = '#660099';
const fedexOrange = '#ff6600';
const fedexGray = '#999999';
const fedexLightGray = '#F2F2F2';

const theme = createTheme({
  palette: {
    primary: {
      main: fedexPurple,
    },
    secondary: {
      main: fedexOrange,
    },
    background: {
      default: fedexLightGray,
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: fedexGray,
    },
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
  },
});

export default theme;

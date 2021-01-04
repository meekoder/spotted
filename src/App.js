import './styles.css';
import Landing from './components/landing/Landing';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e0e0e',
      main: '#616161',
      dark: '#212121',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ea605d',
      main: '#f44336',
      dark: '#932020',
      contrastText: '#000',
    },
  },
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Landing />
    </MuiThemeProvider>
  );
};

export default App;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

const Verify = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(0);
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/verify?pin=${inputValue}`, {method:"POST"})
      .then(() => history.push('/home'))
      .catch(console.log)
  };

  return (
    <Paper elevation={3}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h6 className="accheading">LOG IN</h6>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="pin"
              label="Verification Code"
              name="pin"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
    </Paper>
  );
};

export default Verify;

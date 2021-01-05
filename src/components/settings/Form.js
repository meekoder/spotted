import React, { useState, useContext } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Context from '../Context';

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
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = () => {
  const classes = useStyles();
  const { settings, setSettings } = useContext(Context);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
    setFailOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (confirmedPassword == settings.password) {
      fetch('/api/profile_settings', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(settings)
      })
        .then((r) => r.json())
        .then(() => setSuccessOpen(true))
        .then((s) => console.log(s));
    } else {
      setFailOpen(true);
    }
  };

  const handleSettingsChange = (prop) => (event) => {
    setSettings({ ...settings, [prop]: event.target.value });
  };

  return (
    <div className={classes.paper}>
    <Paper elevation={3}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h6 className="accheading">ACCOUNT SETTINGS</h6>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleSettingsChange('firstname')}
                  value={settings.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleSettingsChange('lastname')}
                  value={settings.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="uname"
                  onChange={handleSettingsChange('username')}
                  value={settings.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleSettingsChange('email')}
                  value={settings.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone number"
                  label="Phone Number"
                  name="phone"
                  autoComplete="tel"
                  onChange={handleSettingsChange('phone')}
                  value={settings.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="outlined-multiline-static"
                  multiline
                  fullWidth
                  rows={4}
                  label="Bio"
                  onChange={handleSettingsChange('bio')}
                  value={settings.bio}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleSettingsChange('password')}
                  value={settings.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  value={confirmedPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </form>
        </div>
      </Container>
    </Paper>
      <Snackbar open={successOpen} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} elevation={6} variant="filled" severity="success">Profile Saved!</MuiAlert>
      </Snackbar>
      <Snackbar open={failOpen} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} elevation={6} variant="filled" severity="error">Passwords must match!</MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Form;

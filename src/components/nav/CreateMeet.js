import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Context from '../Context';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  dialog: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogUser: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  dialogUsername: {
    marginLeft: 5,
  },
  textbox: {
    minWidth: '100%',
  },
  grid: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    marginTop: 15,
  },
}));

const CreateMeet = ({ open, handleCloseCreate }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useContext(Context);

  const [meetValues, setMeetValues] = useState({
    title: '',
    meetdate: selectedDate,
    timestart: '07:30',
    timeend: '08:30',
    street: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const handleMeetChange = (prop) => (event) => {
    setMeetValues({ ...meetValues, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePostMeet = () => {
    fetch('/api/meets', {
      method: "POST",
      body: JSON.stringify(meetValues),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <Dialog open={open} onClose={() => handleCloseCreate('meet')} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
        Create Meet
        <Divider />
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <div className={classes.dialogUser}>
          <Avatar src={user.avatar} />
          <p className={classes.dialogUsername}>{user.username}</p>
        </div>
        <form className={classes.container} noValidate>
          <Grid 
            className={classes.grid}
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <TextField
              label="Title"
              margin="normal"
              variant="outlined"
              onChange={handleMeetChange('title')}
            />
          </Grid>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  inputVariant="outlined"
                />
              </Grid>
              <Grid 
                className={classes.grid}
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item xs={6} className={classes.margin}>
                  <TextField
                    id="time"
                    label="Time Start"
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    variant="outlined"
                    onChange={handleMeetChange('timestart')}
                  />
                </Grid>
                <Grid item xs={6} className={classes.margin}>
                  <TextField
                    id="time"
                    label="Time End"
                    type="time"
                    defaultValue="08:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    variant="outlined"
                    onChange={handleMeetChange('timeend')}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <TextField
              id="outlined-full-width"
              label="Address"
              placeholder="Street"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleMeetChange('street')}
            />
            <Grid 
              className={classes.grid}
              container
              spacing={1}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={5}>
                <TextField
                  label="City"
                  margin="normal"
                  variant="outlined"
                  onChange={handleMeetChange('city')}
                />
              </Grid>
              <Grid item >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label" className={classes.inputLabel}>State</InputLabel>
                  <Select
                    value={meetValues.state}
                    onChange={handleMeetChange('state')}
                    label="State"
                  >
                    <MenuItem value="AL">AL</MenuItem>
                    <MenuItem value="AK">AK</MenuItem>
                    <MenuItem value="AS">AS</MenuItem>
                    <MenuItem value="AZ">AZ</MenuItem>
                    <MenuItem value="AR">AR</MenuItem>
                    <MenuItem value="CA">CA</MenuItem>
                    <MenuItem value="CO">CO</MenuItem>
                    <MenuItem value="CT">CT</MenuItem>
                    <MenuItem value="DE">DE</MenuItem>
                    <MenuItem value="DC">DC</MenuItem>
                    <MenuItem value="FL">FL</MenuItem>
                    <MenuItem value="GA">GA</MenuItem>
                    <MenuItem value="GU">GU</MenuItem>
                    <MenuItem value="HI">HI</MenuItem>
                    <MenuItem value="ID">ID</MenuItem>
                    <MenuItem value="IL">IL</MenuItem>
                    <MenuItem value="IN">IN</MenuItem>
                    <MenuItem value="IA">IA</MenuItem>
                    <MenuItem value="KS">KS</MenuItem>
                    <MenuItem value="KY">KY</MenuItem>
                    <MenuItem value="LA">LA</MenuItem>
                    <MenuItem value="ME">ME</MenuItem>
                    <MenuItem value="MD">MD</MenuItem>
                    <MenuItem value="MA">MA</MenuItem>
                    <MenuItem value="MI">MI</MenuItem>
                    <MenuItem value="MN">MN</MenuItem>
                    <MenuItem value="MS">MS</MenuItem>
                    <MenuItem value="MO">MO</MenuItem>
                    <MenuItem value="MT">MT</MenuItem>
                    <MenuItem value="NE">NE</MenuItem>
                    <MenuItem value="NV">NV</MenuItem>
                    <MenuItem value="NH">NH</MenuItem>
                    <MenuItem value="NJ">NJ</MenuItem>
                    <MenuItem value="NM">NM</MenuItem>
                    <MenuItem value="NY">NY</MenuItem>
                    <MenuItem value="NC">NC</MenuItem>
                    <MenuItem value="ND">ND</MenuItem>
                    <MenuItem value="MP">MP</MenuItem>
                    <MenuItem value="OH">OH</MenuItem>
                    <MenuItem value="OK">OK</MenuItem>
                    <MenuItem value="OR">OR</MenuItem>
                    <MenuItem value="PA">PA</MenuItem>
                    <MenuItem value="PR">PR</MenuItem>
                    <MenuItem value="RI">RI</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="SD">SD</MenuItem>
                    <MenuItem value="TN">TN</MenuItem>
                    <MenuItem value="TX">TX</MenuItem>
                    <MenuItem value="UT">UT</MenuItem>
                    <MenuItem value="VT">VT</MenuItem>
                    <MenuItem value="VA">VA</MenuItem>
                    <MenuItem value="VI">VI</MenuItem>
                    <MenuItem value="WA">WA</MenuItem>
                    <MenuItem value="WV">WV</MenuItem>
                    <MenuItem value="WI">WI</MenuItem>
                    <MenuItem value="WY">WY</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Zip Code"
                  margin="normal"
                  variant="outlined"
                  onChange={handleMeetChange('zipcode')}
                />
              </Grid>
            </Grid>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => handleCloseCreate('meet') } color="primary">
          Cancel
        </Button>
        <Button onClick={ () => { handlePostMeet(); handleCloseCreate('meet'); }} color="primary">
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMeet;

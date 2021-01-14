import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhotoUpload from '../PhotoUpload';

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
  inputLabel: {
    marginTop: 7,
  },
  formControl: {
    paddingTop: 8,
    minWidth: 120,
  },
  transmission: {
    paddingTop: 8,
    minWidth: 150,
  },
}));

const CreateListing = ({ open, handleCloseCreate }) => {
  const classes = useStyles();
  const { user, selectedFile, setSelectedFile } = useContext(Context);

  const [listingValues, setListingValues] = useState({
    photo: selectedFile[0],
    listeddate: new Date(),
    transmission: '',
    year: '',
    make: '',
    model: '',
    price: '',
    mileage: '',
    condition: '',
    city: '',
    state: '',
    description: '',
    sold: false,
  });

  const handleListingChange = (prop) => (event) => {
    setListingValues({ ...listingValues, [prop]: event.target.value });
  };

  const handlePostListing = () => {
    const listingObj = {...listingValues};
    listingObj.photo = selectedFile[0];
    fetch('/api/listings', {
      method: "POST",
      body: JSON.stringify(listingObj),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => {
        console.log(res);
        setSelectedFile([]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Dialog open={open} onClose={() => handleCloseCreate('listing')} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
        Create Listing
        <Divider />
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <div className={classes.dialogUser}>
          <Avatar src={user.avatar} />
          <p className={classes.dialogUsername}>{user.username}</p>
        </div>
        <form noValidate>
          <Grid 
            className={classes.grid}
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
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
                  id="outlined-margin-normal"
                  margin="normal"
                  variant="outlined"
                  onChange={handleListingChange('city')}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label" className={classes.inputLabel}>State</InputLabel>
                  <Select
                    value={listingValues.state}
                    onChange={handleListingChange('state')}
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
            </Grid>
            <Grid 
              className={classes.grid}
              container
              spacing={1}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label" className={classes.inputLabel}>Year</InputLabel>
                  <Select
                    value={listingValues.year}
                    onChange={handleListingChange('year')}
                    label="Year"
                  >
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2019">2019</MenuItem>
                    <MenuItem value="2018">2018</MenuItem>
                    <MenuItem value="2017">2017</MenuItem>
                    <MenuItem value="2016">2016</MenuItem>
                    <MenuItem value="2015">2015</MenuItem>
                    <MenuItem value="2014">2014</MenuItem>
                    <MenuItem value="2013">2013</MenuItem>
                    <MenuItem value="2012">2012</MenuItem>
                    <MenuItem value="2011">2011</MenuItem>
                    <MenuItem value="2010">2010</MenuItem>
                    <MenuItem value="2009">2009</MenuItem>
                    <MenuItem value="2008">2008</MenuItem>
                    <MenuItem value="2007">2007</MenuItem>
                    <MenuItem value="2006">2006</MenuItem>
                    <MenuItem value="2005">2005</MenuItem>
                    <MenuItem value="2004">2004</MenuItem>
                    <MenuItem value="2003">2003</MenuItem>
                    <MenuItem value="2002">2002</MenuItem>
                    <MenuItem value="2001">2001</MenuItem>
                    <MenuItem value="2000">2000</MenuItem>
                    <MenuItem value="1999">1999</MenuItem>
                    <MenuItem value="1998">1998</MenuItem>
                    <MenuItem value="1997">1997</MenuItem>
                    <MenuItem value="1996">1996</MenuItem>
                    <MenuItem value="1995">1995</MenuItem>
                    <MenuItem value="1994">1994</MenuItem>
                    <MenuItem value="1993">1993</MenuItem>
                    <MenuItem value="1992">1992</MenuItem>
                    <MenuItem value="1991">1991</MenuItem>
                    <MenuItem value="1990">1990</MenuItem>
                    <MenuItem value="1989">1989</MenuItem>
                    <MenuItem value="1988">1988</MenuItem>
                    <MenuItem value="1987">1987</MenuItem>
                    <MenuItem value="1986">1986</MenuItem>
                    <MenuItem value="1985">1985</MenuItem>
                    <MenuItem value="1984">1984</MenuItem>
                    <MenuItem value="1983">1983</MenuItem>
                    <MenuItem value="1982">1982</MenuItem>
                    <MenuItem value="1981">1981</MenuItem>
                    <MenuItem value="1980">1980</MenuItem>
                    <MenuItem value="1979">1979</MenuItem>
                    <MenuItem value="1978">1978</MenuItem>
                    <MenuItem value="1977">1977</MenuItem>
                    <MenuItem value="1976">1976</MenuItem>
                    <MenuItem value="1975">1975</MenuItem>
                    <MenuItem value="1974">1974</MenuItem>
                    <MenuItem value="1973">1973</MenuItem>
                    <MenuItem value="1972">1972</MenuItem>
                    <MenuItem value="1971">1971</MenuItem>
                    <MenuItem value="1970">1970</MenuItem>
                    <MenuItem value="1969">1969</MenuItem>
                    <MenuItem value="1968">1968</MenuItem>
                    <MenuItem value="1967">1967</MenuItem>
                    <MenuItem value="1966">1966</MenuItem>
                    <MenuItem value="1965">1965</MenuItem>
                    <MenuItem value="1964">1964</MenuItem>
                    <MenuItem value="1963">1963</MenuItem>
                    <MenuItem value="1962">1962</MenuItem>
                    <MenuItem value="1961">1961</MenuItem>
                    <MenuItem value="1960">1960</MenuItem>
                    <MenuItem value="1959">1959</MenuItem>
                    <MenuItem value="1958">1958</MenuItem>
                    <MenuItem value="1957">1957</MenuItem>
                    <MenuItem value="1956">1956</MenuItem>
                    <MenuItem value="1955">1955</MenuItem>
                    <MenuItem value="1954">1954</MenuItem>
                    <MenuItem value="1953">1953</MenuItem>
                    <MenuItem value="1952">1952</MenuItem>
                    <MenuItem value="1951">1951</MenuItem>
                    <MenuItem value="1950">1950</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Make"
                  id="outlined-margin-normal"
                  margin="normal"
                  variant="outlined"
                  onChange={handleListingChange('make')}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Model"
                  id="outlined-margin-normal"
                  margin="normal"
                  variant="outlined"
                  onChange={handleListingChange('model')}
                />
              </Grid>
            </Grid>
            <Grid 
              className={classes.grid}
              container
              spacing={1}
              alignItems="center"
            >
              <Grid item xs={4}>
                <TextField
                  label="Mileage"
                  id="outlined-margin-normal"
                  margin="normal"
                  variant="outlined"
                  onChange={handleListingChange('mileage')}
                />
              </Grid>
              <Grid item>
                <FormControl variant="outlined" className={classes.transmission}>
                  <InputLabel id="demo-simple-select-outlined-label" className={classes.inputLabel}>Transmission</InputLabel>
                  <Select
                    value={listingValues.transmission}
                    onChange={handleListingChange('transmission')}
                    label="Transmission"
                  >
                    <MenuItem value="Automatic">Automatic</MenuItem>
                    <MenuItem value="Manual">Manual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label" className={classes.inputLabel}>Condition</InputLabel>
                  <Select
                    value={listingValues.condition}
                    onChange={handleListingChange('condition')}
                    label="Condition"
                  >
                    <MenuItem value="Excellent">Excellent</MenuItem>
                    <MenuItem value="Very Good">Very Good</MenuItem>
                    <MenuItem value="Good">Good</MenuItem>
                    <MenuItem value="Fair">Fair</MenuItem>
                    <MenuItem value="Poor">Poor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid 
              className={classes.grid}
              container
              spacing={1}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <FormControl className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={40}
                    onChange={handleListingChange('price')}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid 
              className={classes.grid}
              container
              spacing={1}
              direction="column"
              justify="flex-start"
            >
              <Grid item>
                <TextField
                  style={{ marginTop: 15 }}
                  label="Description"
                  className={classes.textbox}
                  id="outlined-multiline-static"
                  multiline
                  rows={6}
                  variant="outlined"
                  onChange={handleListingChange('description')}
                />
              </Grid>
              <PhotoUpload />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseCreate('listing')} color="primary">
          Cancel
        </Button>
        <Button onClick={() => { handlePostListing(); handleCloseCreate('listing'); }} color="primary">
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListing;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Buttons = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        <Link style={{ textDecoration: 'none'}} color="white" href="/login" className="link">Log In</Link>
      </Button>
      <Button variant="contained" color="secondary">
        <Link style={{ textDecoration: 'none'}} color="white" href="/registration" className="link">Sign Up</Link> 
      </Button>
    </div>
  );
};

export default Buttons;

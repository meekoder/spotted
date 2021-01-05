import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  start: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '50vw',
  },
}));

const NoLikes = () => {
  const classes = useStyles();
  return (
    <div className={classes.start}>
      <Paper elevation={3} className={classes.paper}>
          <Typography variant="body1" align="center">
            <h6 className="noLikes">NO LIKED POSTS!</h6>
          </Typography>
      </Paper>
    </div>
  );
};

export default NoLikes;

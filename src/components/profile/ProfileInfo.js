import React, { useContext }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Context from '../Context';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: 40,
    marginTop: 40,
  },
});

const ProfileInfo = () => {
  const classes = useStyles();
  const { user } = useContext(Context);

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="profile picture"
        height="300"
        image={user.avatar}
        title="Profile Picture"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {user.firstname} {user.lastname}
        </Typography>
        <Typography variant="body1" component="p">
          {user.username}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {user.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  header: {
    maxHeight: 65,
  },
  title: {
    fontSize: 22,
    margin: 0,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const Meet = ({ meet }) => {
  const classes = useStyles();
  const title = <h6 className={classes.title}>{meet.title}</h6>;

  const getDate = (date) => {
    const postDate = new Date(date);
    const day = postDate.getDate();
    const year = postDate.getFullYear();
    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(postDate);
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="post">
      <Card variant="outlined" className={classes.root}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar src={meet.avatar}></Avatar>
          }
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {`${getDate(meet.meetdate)} ~ ${meet.timestart}PM - ${meet.timeend}PM`}
          </Typography>
          <Typography variant="body2" component="p">
            {meet.street}
            <br />
            {`${meet.city}, ${meet.state} ${meet.zipcode}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

Meet.propTypes = {
  meet: PropTypes.object,
};

export default Meet;

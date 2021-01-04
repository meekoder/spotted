import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '75ch',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Comments = ({ comments }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
    </List>
  );
}

export default Comments;

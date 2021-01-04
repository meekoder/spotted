import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import SendIcon from '@material-ui/icons/Send';
import Context from '../Context';

const useStyles = makeStyles((theme) => ({
  comment: {
    alignItems: 'center',
  }
}));

const CommentBox = ({ postId, setComments, comments }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const { user } = useContext(Context);
  
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = () => {
    const commentObj = {
      avatar: user.avatar,
      username: user.username,
      commentDate: new Date(),
      comment,
      post_id: postId,
    };

    fetch('/api/comment', {
      method: "POST",
      body: JSON.stringify(commentObj),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => console.log(res))
      .then(() => setComments([...comments, commentObj]))
      .then(() => setComment(''))
      .catch((err) => console.error(err));
  };

  return (
    <ListItem alignItems="flex-start" className={classes.comment}>
      <Avatar src={user.avatar} />
      <TextField
        id="outlined-full-width"
        style={{ margin: 8 }}
        placeholder="Write A Comment"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={comment}
        onChange={handleChange}
      />
      <IconButton color="primary" className={classes.iconButton} aria-label="send" onClick={handleComment}>
        <SendIcon />
      </IconButton>
    </ListItem>
  );
};

export default CommentBox;

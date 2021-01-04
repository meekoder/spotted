import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Comments from './Comments';
import CommentBox from './CommentBox';
import Context from '../Context';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  liked: {
    color: 'red',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(post.isliked);
  const { user } = useContext(Context);

  useEffect(() => {
    const getComments = () => {
      fetch(`/api/${post.id}/comments`)
        .then((r) => r.json())
        .then((c) => setComments(c))
        .catch((err) => console.error(err));
    };
    getComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDate = (date) => {
    const postDate = new Date(date);
    const day = postDate.getDate();
    const year = postDate.getFullYear();
    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(postDate);
    return `${month} ${day}, ${year}`;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    fetch('/api/likes', {
      method: "POST",
      body: JSON.stringify({ isLiked: !liked, user_id: user.id, post_id: post.id }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => console.log(res))
      .then(() => setLiked(!liked))
      .catch((err) => console.error(err));
  };

  return (
    <div className="post">
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} src={post.avatar}></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.username}
          subheader={getDate(post.postdate)}
        />
        <CardMedia
          className={classes.media}
          image={post.photo}
          title="post"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.caption}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon className={liked ? classes.liked : null} />
          </IconButton>
          <IconButton onClick={handleExpandClick} aria-label="comment">
            <CommentIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comments comments={comments} />
            <CommentBox postId={post.id} setComments={setComments} comments={comments} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;

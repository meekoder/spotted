import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Context from '../Context';
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
import Comments from '../home/Comments';
import CommentBox from '../home/CommentBox';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  liked: {
    color: 'red',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Like = ({ like }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(like.isliked);
  const { user } = useContext(Context);

  useEffect(() => {
    const getComments = () => {
      fetch(`/api/${like.id}/comments`)
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
      body: JSON.stringify({ isLiked: !liked, user_id: user.id, post_id: like.id }),
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
            <Avatar className={classes.avatar} src={like.avatar}></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={like.username}
          subheader={getDate(like.postdate)}
        />
        <CardMedia
          className={classes.media}
          image={like.photo}
          title="post"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{like.caption}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon className={liked ? classes.liked : null} />
          </IconButton>
          <IconButton aria-label="share">
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
            <CommentBox post={like.id} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

Like.propTypes = {
  like: PropTypes.object,
};

export default Like;

import React, { useEffect, useState, useContext }from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav';
import ProfileInfo from './ProfileInfo';
import Posts from '../home/Posts';
import Grid from '@material-ui/core/Grid';
import Context from '../Context';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  top: {
    minHeight: 5,
    maxHeight: 5,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const ScrollTop = (props) => {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100
    });

    const handleClick = event => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  };

  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const [userProf, setUserProf] = useState({});
  const { user } = useContext(Context);
  const [userPosts, setUserPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    async function getProfile() {
      await fetch('/api/profil')
        .then(r => r.json())
        .then((user) => setUserProf(user))
        .catch(err => history.push('/login'));
    } 

    async function getUserPosts() {
      await fetch('/api/profile')
        .then(r => r.json())
        .then((r) => {
          setUserPosts(r.rows);
        })
        .catch(err => history.push('/login'));
    } 

    getProfile();
    getUserPosts();
  }, []);

  return (
    <div>
      <Nav/>
      <div>
        <Toolbar id="back-to-top-anchor" className={classes.top} />
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <div className='profileInfo'>
              <ProfileInfo username={userProf.username} firstname={userProf.firstname}  lastname={userProf.lastname} avatar={userProf.avatar} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Posts posts={userPosts} />
          </Grid>
          <React.Fragment>
            <CssBaseline />
            <ScrollTop>
              <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
          </React.Fragment>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;

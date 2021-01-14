import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import 'date-fns';
import Context from './Context';
import MainMenu from './nav/MainMenu';
import NavTitle from './nav/NavTitle';
import CreateMenu from './nav/CreateMenu';
import CreatePost from './nav/CreatePost';
import CreateMeet from './nav/CreateMeet';
import CreateListing from './nav/CreateListing';
import ProfileMenu from './nav/ProfileMenu';

const useStyles = makeStyles((theme) => ({
  rightMenus: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [openCreateMeet, setOpenCreateMeet] = useState(false);
  const [openCreateListing, setOpenCreateListing] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const { user, setPosts, posts, setUser } = useContext(Context);

  useEffect(() => {
    async function getUser() {
      await fetch('/api/user')
        .then((r) => r.json())
        .then((u) => setUser(u))
        .catch((err) => console.error(err));
    }

    getUser();
  }, []);

  const handleProfileMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleOpenCreate = (menu) => {
    const obj = {
      'post': () => setOpenCreatePost(true),
      'meet': () => setOpenCreateMeet(true),
      'listing': () => setOpenCreateListing(true),
    };
    obj[menu]();
  };

  const handleCloseCreate = (menu) => {
    const obj = {
      'post': () => setOpenCreatePost(false),
      'meet': () => setOpenCreateMeet(false),
      'listing': () => setOpenCreateListing(false),
    };
    obj[menu]();
  };

  return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <MainMenu />
          <NavTitle />
          <div>
            <div className={classes.rightMenus}>
              <CreateMenu handleOpenCreate={handleOpenCreate} />
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <Avatar src={user.avatar} />
              </IconButton>
            </div>
            <CreatePost open={openCreatePost} handleCloseCreate={handleCloseCreate} />
            <CreateMeet open={openCreateMeet} handleCloseCreate={handleCloseCreate} />
            <CreateListing open={openCreateListing} handleCloseCreate={handleCloseCreate} />
            <ProfileMenu profileAnchorEl={profileAnchorEl} handleProfileMenu={handleProfileMenu} />
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default Nav;

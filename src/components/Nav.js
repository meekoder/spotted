import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import 'date-fns';
import Context from './Context';
import MainMenu from './nav/MainMenu';
import NavTitle from './nav/NavTitle';
import CreateMenu from './nav/CreateMenu';
import CreatePost from './nav/CreatePost';
import CreateMeet from './nav/CreateMeet';
import CreateListing from './nav/CreateListing';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'inherit',
  },
  margin: {
    marginTop: 15,
  },
  grid: {
    flexGrow: 1,
  },
  times: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'space-between',
  },
  inputLabel: {
    marginTop: 7,
  },
  address: {
    display: 'flex',
    alignItems: 'center',
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogUser: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  dialog: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  dateTime: {
    justifyContent: 'flex-start',
  },
  dialogUsername: {
    marginLeft: 5,
  },
  textbox: {
    minWidth: '100%',
  },
  menuTitle: {
    marginLeft: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [openCreateMeet, setOpenCreateMeet] = useState(false);
  const [openCreateListing, setOpenCreateListing] = useState(false);
  const { user, setPosts, posts, setUser } = useContext(Context);
  const profileOpen = Boolean(profileAnchorEl);
  let history = useHistory(); 

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

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    fetch('/api/logout')
      .then((res) => res.json())
      .catch(() => history.push('/'));
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
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <MainMenu />
          <NavTitle />
          <div>
            <CreateMenu handleOpenCreate={handleOpenCreate} />
            <CreatePost open={openCreatePost} handleCloseCreate={handleCloseCreate} />
            <CreateMeet open={openCreateMeet} handleCloseCreate={handleCloseCreate} />
            <CreateListing open={openCreateListing} handleCloseCreate={handleCloseCreate} />

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenu}
              color="inherit"
            >
              <Avatar src={user.avatar} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={profileAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={profileOpen}
              onClose={handleProfileClose}
            >
              <Link style={{ textDecoration: 'none'}} color="inherit" href="/profile">
                <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
              </Link>
              <Link style={{ textDecoration: 'none'}} color="inherit" href="/settings">
                <MenuItem onClick={handleProfileClose}>Account Settings</MenuItem>
              </Link>
              <MenuItem onClick={handleProfileClose}>Spotted</MenuItem>
              <Link style={{ textDecoration: 'none'}} color="inherit" href="/likes">
                <MenuItem onClick={handleProfileClose}>Likes</MenuItem>
              </Link>
              <Divider />
              <Link style={{ textDecoration: 'none'}} color="inherit">
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;

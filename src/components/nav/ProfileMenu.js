import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

const ProfileMenu = () => {
  let history = useHistory(); 
  const { profileAnchorEl, setProfileAnchorEl } = useContext(Context);
  const profileOpen = Boolean(profileAnchorEl);

  const handleProfileClose = (e) => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    fetch('/api/logout')
      .then((res) => res.json())
      .catch(() => history.push('/'));
  };

  return (
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
  );
}

export default ProfileMenu;

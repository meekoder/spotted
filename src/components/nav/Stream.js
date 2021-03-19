import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
}));

const MainMenu = () => {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = useState(null);
      const menuOpen = Boolean(anchorEl);

      const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
            setAnchorEl(null);
      };
      return (
            <div>
                  <IconButton 
                        edge="start" 
                        color="inherit"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                  >
                        <VideocamIcon />
                  </IconButton>
                  <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                        }}
                        open={menuOpen}
                        onClose={handleClose}
                  >
                        <Link style={{ textDecoration: 'none'}} color="inherit" href="/livestream">
                              <MenuItem onClick={handleClose}>Start Livestream</MenuItem>
                        </Link>
                  </Menu>
            </div>
      );
};

export default MainMenu;

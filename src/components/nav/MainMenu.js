import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
      menuButton: {
            marginRight: theme.spacing(2),
      },
}));

const MainMenu = () => {
      const classes = useStyles();
      const [menuAnchorEl, setMenuAnchorEl] = useState(null);
      const menuOpen = Boolean(menuAnchorEl);

      const handleMenu = (event) => {
            setMenuAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
            setMenuAnchorEl(null);
      };

      return (
            <div>
                  <IconButton 
                        edge="start" 
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                  >
                        <MenuIcon />
                  </IconButton>
                  <Menu
                        id="menu-appbar"
                        anchorEl={menuAnchorEl}
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
                        <Link style={{ textDecoration: 'none'}} color="inherit" href="/home">
                              <MenuItem onClick={handleClose}>Home</MenuItem>
                        </Link>
                        <Link style={{ textDecoration: 'none'}} color="inherit" href="/meets">
                              <MenuItem onClick={handleClose}>Meets</MenuItem>
                        </Link>
                        <Link style={{ textDecoration: 'none'}} color="inherit" href="/marketplace">
                              <MenuItem onClick={handleClose}>Marketplace</MenuItem>
                        </Link>
                  </Menu>
            </div>
      );
};

export default MainMenu;

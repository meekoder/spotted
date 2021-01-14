import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import StoreIcon from '@material-ui/icons/Store';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
      menuTitle: {
            marginLeft: 10,
      },
      createMenu: {
            marginLeft: 10,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
      },
}));

const CreateMenu = ({ handleOpenCreate }) => {
      const classes = useStyles();
      const [createAnchorEl, setCreateAnchorEl] = useState(null);
      const createOpen = Boolean(createAnchorEl);

      const handleOpenCreatePost = () => {
            handleOpenCreate('post');
      };

      const handleOpenCreateMeet = () => {
            handleOpenCreate('meet');
      };

      const handleCreateMenu = (event) => {
            setCreateAnchorEl(event.currentTarget);
      };

      const handleCreateClose = () => {
            setCreateAnchorEl(null);
      };

      return (
            <div>
                  <IconButton
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleCreateMenu}
                        color="inherit"
                  >
                        <AddIcon />
                  </IconButton>
                  <Menu
                        id="menu-appbar"
                        anchorEl={createAnchorEl}
                        anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                        }}
                        keepmounted
                        transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                        }}
                        open={createOpen}
                        onClose={handleCreateClose}
                  >
                        <Typography className={classes.menuTitle} variant="h5">Create</Typography>
                        <Divider />
                        <MenuItem onClick={() => { handleCreateClose(); handleOpenCreatePost(); }}>
                              <PostAddIcon />
                              <div className={classes.createMenu}>
                                    <Typography variant="body1">Post</Typography>
                                    <Typography variant="caption">Share a post.</Typography>
                              </div>
                        </MenuItem>
                        <MenuItem onClick={() => { handleCreateClose(); handleOpenCreateMeet(); }}>
                              <DriveEtaIcon />
                              <div className={classes.createMenu}>
                                    <Typography variant="body1">Event</Typography>
                                    <Typography variant="caption">Share information on a local car meet.</Typography>
                              </div>
                        </MenuItem>
                        <MenuItem onClick={() => { handleCreateClose(); handleOpenCreate('listing'); }}>
                              <StoreIcon />
                              <div className={classes.createMenu}> 
                                    <Typography variant="body1">Listing</Typography>
                                    <Typography variant="caption">Sell a car or truck.</Typography>
                              </div>
                        </MenuItem>
                  </Menu>
            </div>
      );
};

export default CreateMenu;

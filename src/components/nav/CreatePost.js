import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Context from '../Context';
import PhotoUpload from '../PhotoUpload';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  dialog: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
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
  dialogUsername: {
    marginLeft: 5,
  },
  textbox: {
    minWidth: '100%',
  },
}));

const CreatePost = ({ open, handleCloseCreate }) => {
      const classes = useStyles();
  const { user, selectedFile, setSelectedFile } = useContext(Context);
  const [postValues, setPostValues] = useState({
    postdate: new Date(),
    caption: '',
    photo: selectedFile[0],
    owner_id: 0,
  });


  const handlePostChange = (prop) => (event) => {
    setPostValues({ ...postValues, [prop]: event.target.value });
  };

  const handlePost = () => {
    const postObj = {...postValues};
    postObj.photo = selectedFile[0];
    fetch('/api/home', {
      method: "POST",
      body: JSON.stringify(postObj),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((res) => {
        console.log(res);
        setSelectedFile([]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Dialog open={open} onClose={() => handleCloseCreate('post')} aria-labelledby="form-dialog-title">
              <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
                Create Post
                <Divider />
              </DialogTitle>
              <DialogContent className={classes.dialog}>
                <div className={classes.dialogUser}>
                  <Avatar src={user.avatar} />
                  <p className={classes.dialogUsername}>{user.username}</p>
                </div>
                <TextField
                  className={classes.textbox}
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handlePostChange('caption')}
                />
                <PhotoUpload />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseCreate('post')} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => { handlePost(); handleCloseCreate('post'); }} color="primary">
                  Post
                </Button>
              </DialogActions>
            </Dialog>
  );
};

export default CreatePost;

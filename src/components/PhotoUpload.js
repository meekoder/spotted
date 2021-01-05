import React, { useRef, useContext, Fragment }from 'react';
import S3FileUpload from 'react-s3';
import config from './config';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Context from './Context';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const PhotoUpload = () =>{
  const classes = useStyles();
  const { selectedFile, setSelectedFile } = useContext(Context);
  const photosInput = useRef(null);

  const handleUploadClick = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        setSelectedFile([data.location]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const imageResetHandler = () => {
    // image wont reappear if the same image that was removed was reuploaded
    // photosInput.current.files = null;
    setSelectedFile([]);
  };

  const uploadedState = () => {
    const file = selectedFile.length ? selectedFile[0] : '';

    return (
      <Fragment>
        <CardActionArea onClick={imageResetHandler}>
          <img
            alt="post"
            width="100%"
            className={classes.media}
            src={file}
          />
        </CardActionArea>
      </Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="contained-button-file"
      />
      <h4>Upload Photo</h4>
      <input onChange={handleUploadClick} ref={photosInput} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoLibraryIcon />
        </IconButton>
      </label>
      {selectedFile.length ? uploadedState() : null}
    </div>
  );
};

export default PhotoUpload;

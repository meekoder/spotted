import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Buttons from "./Buttons";

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '150px',
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <header className="overlay">
      <img className="landingPhoto" src="/assets/ae86.jpg" alt="toyota ae86" />
      <section className="header">
        <div className={classes.image}>
          <img alt="spotted icon" className={classes.logo} src="spottedRB.png"/>
          <h1 className="title">SPOTTED</h1>
        </div>
        <p className="caption">The gateway to the car scene starts here.</p>
        <Buttons />
      </section>
    </header>
  );
};

export default Main;

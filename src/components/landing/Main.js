import React, { useState } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import Buttons from "./Buttons";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const steps = [
  {
    alt: "toyota ae86",
    imgPath: "/assets/ae86.jpg"
  },
  {
    alt: "honda s2000",
    imgPath: "/assets/s2k.jpg"
  },
  {
    alt: "350z",
    imgPath: "/assets/z.jpg"
  },
]

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '150px',
  },
  img: {
    opacity: '0.4',
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: 5,
    display: 'block',
    overflow: 'hidden',
  },
  overlay: {
    width: '100vw',
    backgroundColor: 'black',
    overflow: 'hidden',
    zIndex: 2,
  },
}));

const Main = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <header className={classes.overlay}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {steps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.alt} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
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

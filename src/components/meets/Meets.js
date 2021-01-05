import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Context from '../Context';
import MeetsList from './MeetsList';
import Nav from '../Nav';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
  top: {
    minHeight: 5,
    maxHeight: 5,
  },
}));

const Meets = () => {
  const classes = useStyles();
  const ScrollTop = (props) => {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100
    });

    const handleClick = event => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  };

  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const { meets } = useContext(Context);

  return (
    <div>
      <Nav />
      <Toolbar id="back-to-top-anchor" className={classes.top} />
      <MeetsList meets={meets} />
      <React.Fragment>
        <CssBaseline />
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    </div>
  );
};

export default Meets;

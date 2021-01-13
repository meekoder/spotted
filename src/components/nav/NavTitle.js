import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
      logo: {
            height: '30px',
      },
      title: {
            flexGrow: 1,
      },
      image: {
            display: 'flex',
            alignItems: 'center',
      },
      navTitle: {
            fontSize: '30px',
            fontStyle: 'italic',
            color: 'white',
            letterSpacing: '2px',
            fontFamily: 'impact',
            margin: 0,
            userSelect: 'none',
      },
}));

const NavTitle = () => {
      const classes = useStyles();
      return (
            <Typography variant="h6" className={classes.title}>
                  <Link style={{ textDecoration: 'none'}} color="inherit" href="/home">
                        <div className={classes.image}>
                              <img alt="spotted icon" className={classes.logo} src="spottedRB.png"/>
                              <div className={classes.navTitle}>
                                    SPOTTED
                              </div>
                        </div>
                  </Link>
            </Typography>
      );
};

export default NavTitle;

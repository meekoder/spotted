import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import PhoneIcon from '@material-ui/icons/Phone';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import BuildIcon from '@material-ui/icons/Build';
import CommuteIcon from '@material-ui/icons/Commute';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    margin: 0,
  },
  avatar: {
    backgroundColor: red[500],
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  noMargin: {
    margin: 0,
  },
  noMarginTop: {
    marginTop: 0,
  },
  noMarginBot: {
    marginBottom: 0,
  },
  marginBot: {
    marginBottom: 10,
  },
  marginTop: {
    marginTop: 10,
  }
}));

const Listing = ({ listing }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const title = 
    <div className={classes.heading}>
      <h3 className={classes.title}>{`${listing.year} ${listing.make} ${listing.model}`}</h3>
      <h3 className={classes.title}>{`$${numberWithCommas(listing.price)}`}</h3>
    </div>

    const subheading = 
      <div className={classes.icon}>
        <LocationOnIcon />
          {listing.city}, {listing.state}
      </div>

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

  return (
    <div className="post">
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} src={listing.avatar}></Avatar>
          }
          title={title}
          subheader={subheading}
        />
        <CardMedia
          className={classes.media}
          image={listing.photo}
          title="listing"
        />
        <CardActions disableSpacing>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <DescriptionIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1" conmpnent="p">
              <h4 className={classes.noMargin}>Seller's Description</h4>
            </Typography>
            <Typography variant="body1" component="p">
              <p className={classes.noMarginTop}>{listing.description}</p>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="body1" conmpnent="p" className={classes.marginTop}>
              <h4 className={classes.noMargin}>About This Vehicle</h4>
            </Typography>
            <Typography variant="body2" component="p" className={classes.marginBot}>
              <div className={classes.icon}>
                <CommuteIcon />
                <p className={classes.noMargin}>Driven {numberWithCommas(listing.mileage)} miles</p>
              </div>
            </Typography>
            <Typography variant="body2" component="p" className={classes.marginBot}>
              <div className={classes.icon}>
                <DirectionsCarIcon />
                <p className={classes.noMargin}>{listing.transmission} transmission</p>
              </div>
            </Typography>
            <Typography variant="body2" component="p" className={classes.marginBot}>
              <div className={classes.icon}>
                <BuildIcon />
                <p className={classes.noMargin}>{listing.condition} condition</p>
              </div>
            </Typography>
            <Divider variant="middle" />
            <Typography variant="body1" conmpnent="p" className={classes.marginTop}>
              <h4 className={classes.noMargin}>Seller Information</h4>
            </Typography>
            <Typography variant="body2" component="p" className={classes.marginBot}>
              <div className={classes.icon}>
                <PersonIcon />
                {listing.firstname} {listing.lastname}
              </div>
            </Typography>
            <Typography variant="body2" component="p">
              <div className={classes.icon}>
                <PhoneIcon />
                {listing.contactinfo}
              </div>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

Listing.propTypes = {
  listing: PropTypes.object,
};

export default Listing;

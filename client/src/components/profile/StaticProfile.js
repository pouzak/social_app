import React from "react";
import { withStyles, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MUItheme from "../../util/theme";

import Paper from "@material-ui/core/Paper";
import MUILink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import dayjs from "dayjs";
// import { typography } from "@material-ui/system";

import EditDetails from "./EditDetails";

const styles = MUItheme;

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />

          <hr />
          <div className="profile-details">
            <MUILink
              color="primary"
              variant="h5"
              component={Link}
              to={`/users/${handle}`}
            >
              @{handle}
            </MUILink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            {location && (
              <div>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </div>
            )}
            {website && (
              <div>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
                <hr />
              </div>
            )}
            <Typography variant="subtitle1">
              <CalendarToday color="primary" />
              <span color="primary">
                Joined {dayjs(createdAt).format("YYYY MMM")}
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(StaticProfile);

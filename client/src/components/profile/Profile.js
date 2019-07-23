import React, { Component } from "react";
import { withStyles, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MUItheme from "../../util/theme";
import { connect } from "react-redux";
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
import { uploadImage, logoutUser } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";

const styles = MUItheme;

class Profile extends Component {
  handleImageChange = e => {
    const image = e.target.files[0];

    //send to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleImageEvent = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,

      user: {
        creadentials: { handle, createdAt, imageUrl, bio, website, location },
        authenticated,
        loading
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <EditDetails />

            <div className="image-wrapper">
              <IconButton onClick={this.handleImageEvent} className="button">
                <EditIcon color="primary" />
              </IconButton>
              <img src={imageUrl} alt="profile" className="profile-image" />

              <input
                type="file"
                id="imageInput"
                name="imageInput"
                hidden
                onChange={this.handleImageChange}
              />

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

            <IconButton onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login.
            <div className={classes.buttons}>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>laoding...</p>
    );
    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { uploadImage, logoutUser }
)(withStyles(styles)(Profile));

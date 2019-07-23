import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyButton from "../../util/MyButton";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = {
  submitButton: {
    position: "relative",
    marginTop: "10px"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%"
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  profile: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
  },
  root: {
    display: "flex"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  },
  expandButton: {
    position: "absolute",
    left: "90%",
    top: 110
  }
};

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };

  handleClose = () => {
    this.setState({ open: false });
    // this.clearErrors();
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      ui: { loading }
    } = this.props;
    const { open } = this.state;

    const dialog = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={100} thickness={5} />
      </div>
    ) : (
      <div>
        <Grid conatiner spacing={10} xs={12} className={classes.root}>
          <Grid item xs={6}>
            <img src={userImage} alt="imng" className={classes.profile} />
          </Grid>
          <Grid item xs={6}>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${userHandle}`}
            >
              @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography color="textSecondary" variant="body2">
              {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{body}</Typography>
            <LikeButton screamId={screamId} />
            <span>{likeCount} likes, </span>
            <MyButton tip="Comments">
              <ChatIcon />
            </MyButton>
            <span>{commentCount} comments</span>
            <br />
          </Grid>
        </Grid>
        <CommentForm screamId={screamId} />
        <Comments comments={comments} style={{ paddingTop: "50px" }} />
      </div>
    );
    return (
      <div>
        <MyButton
          onClick={this.handleOpen}
          tip="Scream details"
          btnClass={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          size="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            btnClass={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle id="form-dialog-title">{userHandle} Scream!</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText />
            {dialog}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="secondary">
            Cancel
          </Button> */}
            {/* <Button
              onClick={handleSubmit}
              color="primary"
              className={props.classes.submitButton}
              disabled={props.ui.loading}
            >
              Submit{" "}
              {props.ui.loading && (
                <CircularProgress className={props.classes.progressSpinner} />
              )}
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  scream: state.data.scream
});

export default connect(
  mapStateToProps,
  { getScream }
)(withStyles(styles)(ScreamDialog));

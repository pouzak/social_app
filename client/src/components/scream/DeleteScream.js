import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    transform: "scale(1.3)"
  }
};
class DeleteScream extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({
      open: false
    });
  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <MyButton
          tip="Delete"
          onClick={this.handleOpen}
          btnClass={classes.deleteButton}
        >
          <DeleteIcon color="secondary" />
        </MyButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Are you sure want to delete?</DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="secondary" onClick={this.deleteScream}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteScream }
)(withStyles(styles)(DeleteScream));

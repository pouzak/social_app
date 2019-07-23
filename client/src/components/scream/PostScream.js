import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyButton from "../../util/MyButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

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
  }
};

function PostScream(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    body: ""
  });

  // useEffect(() => {
  //   console.log(props);
  // }, []);

  useEffect(() => {
    if (!props.ui.loading && !props.ui.errors.body) {
      setOpen(false);
    }
  }, [props]);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    clearErrors();
    const data = { ...values };
    props.postScream(data);
    setValues({ body: "" });
    // handleClose();
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    props.clearErrors();
  }

  return (
    <div>
      <MyButton tip="Create scream now" onClick={handleClickOpen}>
        <AddIcon />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        value={values.body}
        fullWidth
        size="sm"
      >
        <MyButton
          tip="close"
          onClick={handleClose}
          btnClass={props.classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle id="form-dialog-title">Post a New scream!</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <form onSubmit={handleSubmit}>
            <TextField
              // autoFocus
              margin="dense"
              id="body"
              name="body"
              label="Scream"
              type="text"
              rows="3"
              fullWidth
              value={values.bio}
              error={props.ui.errors.body ? true : false}
              helperText={props.ui.errors.body}
              className={props.classes.textField}
              onChange={e => handleChange(e)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="secondary">
            Cancel
          </Button> */}
          <Button
            onClick={handleSubmit}
            color="primary"
            className={props.classes.submitButton}
            disabled={props.ui.loading}
          >
            Submit{" "}
            {props.ui.loading && (
              <CircularProgress className={props.classes.progressSpinner} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => ({
  ui: state.ui
});
export default connect(
  mapStateToProps,
  { postScream, clearErrors }
)(withStyles(styles)(PostScream));

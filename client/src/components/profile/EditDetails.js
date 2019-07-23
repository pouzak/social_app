import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MUItheme from "../../util/theme";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { editUserDetails } from "../../redux/actions/userActions";

const styles = MUItheme;

function EditDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    bio: "",
    website: "",
    location: ""
  });

  useEffect(() => {
    const neww = {
      bio: props.credentials.bio ? props.credentials.bio : "",
      website: props.credentials.website ? props.credentials.website : "",
      location: props.credentials.location ? props.credentials.location : ""
    };
    setValues(neww);
  }, []);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    const data = { ...values };
    props.editUserDetails(data);
    handleClose();
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit profile info</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <form onSubmit={handleSubmit}>
            <TextField
              // autoFocus
              margin="dense"
              id="bio"
              name="bio"
              label="Bio"
              type="text"
              fullWidth
              value={values.bio}
              onChange={e => handleChange(e)}
            />
            <TextField
              margin="dense"
              id="website"
              name="website"
              label="Website"
              type="text"
              fullWidth
              value={values.website}
              onChange={e => handleChange(e)}
            />
            <TextField
              margin="dense"
              id="website"
              name="location"
              label="Location"
              type="text"
              fullWidth
              value={values.location}
              onChange={e => handleChange(e)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => ({
  credentials: state.user.creadentials
});
export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));

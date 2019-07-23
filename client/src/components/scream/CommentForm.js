import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import theme from "../../util/theme";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = theme;

class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: "" });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
    if (!this.props.ui.loading) {
      this.setState({ body: "" });
    }
  };
  render() {
    const { classes, authenticated } = this.props;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={10} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on scram"
            className={classes.textField}
            value={this.state.body}
            onChange={event => this.handleChange(event)}
            // variant="outlined"
            fullWidth
            helperText={this.state.errors.error}
            error={this.state.errors.error ? true : false}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { submitComment }
)(withStyles(styles)(CommentForm));

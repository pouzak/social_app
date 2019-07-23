import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
import MUItheme from "../util/theme";

const styles = MUItheme;

class signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {}
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true, errors: {} });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(userData, this.props.history);
    // axios
    //   .post("/signup", userData)
    //   .then(res => {
    //     console.log(res.data);
    //     localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(err => {
    //     console.log(err.response.data);
    //     this.setState({ errors: err.response.data, loading: false });
    //   });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      ui: { loading, errors }
    } = this.props;
    //const { loading, errors } = this.state;
    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm style={{}} className={classes.table}>
            <Typography variant="h4" className={classes.pageTitle}>
              Sign Up
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={event => this.handleChange(event)}
                variant="outlined"
                helperText={errors.email}
                error={errors.email ? true : false}
              />
              <br />
              <TextField
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                variant="outlined"
                helperText={errors.password}
                error={errors.password ? true : false}
                onChange={event => this.handleChange(event)}
              />
              <TextField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                className={classes.textField}
                value={this.state.confirmPassword}
                variant="outlined"
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={event => this.handleChange(event)}
              />
              <TextField
                name="handle"
                type="text"
                label="Handle"
                className={classes.textField}
                value={this.state.handle}
                variant="outlined"
                helperText={errors.handle}
                error={errors.handle ? true : false}
                onChange={event => this.handleChange(event)}
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <br />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
                disabled={loading ? true : false}
              >
                Sign Up{" "}
                {loading && (
                  <CircularProgress
                    size={20}
                    color="secondary"
                    className={classes.loader}
                  />
                )}
              </Button>
            </form>
            <div className={classes.register}>
              <small>
                Allready have acc? Login <Link to="/login">here</Link>
              </small>
            </div>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withStyles(styles)(signup));

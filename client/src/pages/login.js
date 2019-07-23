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
import { loginUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center",
    display: "flex"
  },
  table: {
    border: "1px solid #ffff",
    display: "block",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffff",
    boxShadow: "0px 2px 22px -1px rgba(0,0,0,0.39)"
  },
  pageTitle: {
    margin: 30
  },
  textField: {
    marginBottom: 20
  },
  button: {
    width: 200,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginBottom: 5
  },
  register: {
    padding: "10px"
  },
  loader: {
    position: "absolute"
  }
};

class login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {}
  };
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
    // axios
    //   .post("/login", userData)
    //   .then(res => {
    //     localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(err => {
    //     //onsole.log(err.response.data);
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
    //const { errors } = this.state;
    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm style={{}} className={classes.table}>
            <Typography variant="h4" className={classes.pageTitle}>
              Login
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
                Submit{" "}
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
                Don't have an account? Rregister <Link to="/signup">here</Link>
              </small>
            </div>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapActiosnToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActiosnToProps
)(withStyles(styles)(login));

import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";

// Icons

export class Navbar extends Component {
  render() {
    const {
      user: { authenticated }
    } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar className="nav-container">
            {authenticated ? (
              <div style={{ display: "flex" }}>
                {/* <MyButton tip="post a scream">
                  <AddIcon color="white" />
                </MyButton> */}

                <PostScream />

                <Link to="/">
                  <MyButton tip="post a scream">
                    <HomeIcon color="white" />
                  </MyButton>
                </Link>
                <MyButton tip="Notifications">
                  <NotificationIcon color="white" />
                </MyButton>
              </div>
            ) : (
              <div>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </div>
            )}
            {/* {authenticated && (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {!authenticated && (
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            )} */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

export default connect(mapStateToProps)(Navbar);

import React, { Component } from "react";
import axios from "axios";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export class user extends Component {
  state = {
    profile: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);

    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const screamsMarkup = loading ? (
      <p>Loading...</p>
    ) : screams ? (
      screams === null ? (
        <p>No screams from this user.</p>
      ) : (
        screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
      )
    ) : null;
    return (
      <div>
        <Grid container spacing={10}>
          <Grid item sm={8} xs={12}>
            <h2>User screams: </h2>
            <br />
            {screamsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            {this.state.profile && (
              <StaticProfile profile={this.state.profile} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);

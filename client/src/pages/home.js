import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

export class home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let renderScreams = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <div>
        <Grid container spacing={10}>
          <Grid item sm={8} xs={12}>
            {renderScreams}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
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
  { getScreams }
)(home);

import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import { connect } from "react-redux";

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    ) {
      return true;
    } else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const {
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton>
        <Link to="/login">
          <FavoriteBorderIcon color="primary" thickness={2} />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="unlike" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likeScream}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { likeScream, unlikeScream }
)(LikeButton);

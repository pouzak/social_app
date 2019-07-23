import React, { Component } from "react";
import { WithStyles, withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10
  },
  content: {
    padding: 15
  },
  image: {
    minWidth: 150,
    objectFit: "cover"
  }
};

export class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        screamId,
        userHandle,
        createdAt,
        body,
        userImage,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        creadentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} className={classes.image} />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { likeScream, unlikeScream }
)(withStyles(styles)(Scream));

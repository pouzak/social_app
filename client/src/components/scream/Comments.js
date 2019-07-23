import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import theme from "../../util/theme";
import dayjs from "dayjs";
const styles = theme;

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container style={{ display: "block" }}>
        {comments.map((comm, index) => {
          const { body, createdAt, userImage, userHandle } = comm;
          return (
            <div key={createdAt}>
              <Grid
                item
                sm={12}
                style={{
                  border: "1px solid #cccccc",
                  marginTop: "50px",
                  borderRadius: "10px"
                }}
              >
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="asd"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={10}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/user/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.visibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index === comments.length - 1 && (
                <p
                  style={{
                    opacity: "0.5",
                    float: "left"
                  }}
                >
                  @pou dev
                </p>
              )}
            </div>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(Comments);

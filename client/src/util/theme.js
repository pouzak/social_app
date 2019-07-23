export default {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    },
    white: {
      light: "#ffff",
      main: "#ffff",
      dark: "#ffff",
      contrastText: "#fff"
    }
  },
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
  },
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "60%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",

    "& a": {
      margin: "20px 10px"
    }
  },
  submitButton: {
    position: "relative",
    marginTop: "10px"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%"
  },
  invisbileSeparator: {
    border: "none",
    margin: 4
  },
  visbileSeparator: {
    width: "100%",
    margin: 4,
    marginBottom: 20
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
};

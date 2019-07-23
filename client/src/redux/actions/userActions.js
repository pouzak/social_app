import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthHeader(res.data.token);
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch(getUserData());

      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  console.log("fetching user");
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

const setAuthHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const signupUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", userData)
    .then(res => {
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = form => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", form)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

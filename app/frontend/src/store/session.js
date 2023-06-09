import * as Util from '../utils/util';
import * as sessionErrorActions from './session_errors';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';
const SET_SESSION_ERRORS = 'session/setSessionErrors';
const REMOVE_SESSION_ERRORS = 'session/removeSessionErrors';

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};

export const login = ({ email, password }) => async dispatch => {
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: Util.headers()
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user))
  if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
  return response
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName, 
      lastName,
      email,
      password
    }),
    headers: Util.headers()
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  if (data.errors) dispatch(sessionErrorActions.setSessionErrors(data.errors))
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
    headers: Util.headers()
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
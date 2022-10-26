import { loginCache } from "../cache";
import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_API_SERVICE_URL);


const initialState = {
  token: null,
  user: {},
  isLoggedIn: false,
  chatUsers: [],
  chatWindow: []
};

//actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
const GET_USERS = "GET_USERS";
const UPDATE_USER_AVAILABILITY = "UPDATE_USER_AVAILABILITY";
const CHAT_WINDOW_USERS = "CHAT_WINDOW_USERS";

//action creators
export const actionLogin = (user, token) => {
  return { type: LOGIN, payload: { user, token } };
};

export const actionLogout = (user, token) => {
  return { type: LOGOUT, payload: token };
};

export const getAllUser = (users) => {
  return { type: GET_USERS, payload: users}
}

export const updateUserAvailability = (data) => {
  return { type: UPDATE_USER_AVAILABILITY, payload: data }
}

export const openMessengerWindow = (data) => {
  return { type: CHAT_WINDOW_USERS, payload: data }
}

export const actionUpdateUserDetails = (user) => {
  return { type: UPDATE_USER_DETAILS, payload: user };
};

const userReducer = (state = { ...initialState }, action) => {
  let newstate = { ...state };

  if (action.type === LOGIN) {
    newstate.isLoggedIn = true;

    const { user, token } = action.payload;
    [newstate.token, newstate.user] = [token, user];

    loginCache.save(user, token);
  } else if (action.type === LOGOUT) {
    loginCache.clear();

    newstate = { ...initialState };
  } else if (action.type === UPDATE_USER_DETAILS) {
    newstate.user = action.payload;

    loginCache.save(newstate.user, newstate.token);
  } else if (action.type === GET_USERS) {
    newstate.chatUsers = action.payload;
  } else if (action.type === UPDATE_USER_AVAILABILITY) {
    newstate.chatUsers = newstate.chatUsers.map((val) => {
      if (val.id === action.payload.id) {
        val = action.payload
      }
      return val;
    })
  } else if (action.type === CHAT_WINDOW_USERS) {
    newstate.chatWindow = action.payload;
  }

  return newstate;
};

export default userReducer;

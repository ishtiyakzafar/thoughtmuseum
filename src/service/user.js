import http from "./http";
import { getAllUser as chatUsers } from './../store/reducer/user';
import { store } from "./../store";

function login(loginInfo) {
  return http.post("user/login", loginInfo);
}

function signup(signupInfo) {
  return http.post("user/register", signupInfo);
}

async function getAllUser() {
  try {
    const response = await http.get("user");
    store.dispatch(chatUsers(response.users));
  } catch (err) {
    console.log(err);
  }
}

function getUserById(id) {
  return http.get(`user/${id}`);
}

function updateUser(userInfo) {
  return http.put(`user`, userInfo);
}

function deleteUser() {
  return http.delete(`user`);
}

export default {
  login,
  signup,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};

import http from "./http";
import { getAllMessage } from './../store/reducer/message';
import { store } from "./../store";

function SendOnlyMessage(chatInfo) {
  return http.post("chatroom/messages", chatInfo);
}

function getAllMessagesOfChat(chatId) {
  return http.get(`chatroom/${chatId}/messages`);
}

function getAllChatOfUser() {
  return http.get(`chatroom`);
}

async function getConverstion(reciverId) {
  try {
    const response = await http.get(`chatroom/messages?receiverId=${reciverId}`);
    store.dispatch(getAllMessage(response.foundMessages, reciverId));
  } catch (err) {
    console.log(err);
  }
}

export default {
  SendOnlyMessage,
  getAllMessagesOfChat,
  getAllChatOfUser,
  getConverstion,
};

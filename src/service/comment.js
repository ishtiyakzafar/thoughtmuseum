import http from "./http";

function createComment(commentInfo) {
  return http.post("comments", commentInfo);
}

export default {
  createComment,
};

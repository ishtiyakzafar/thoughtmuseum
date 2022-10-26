import http from "./http";

function createPost(postInfo) {
  return http.post("posts", postInfo);
}

function getAllCommentForGivenPost(postId) {
  return http.get(`posts/${postId}/comments`);
}

function getAllPost() {
  return http.get("posts");
}

function postWithComment(workspaceId) {
  return http.get(`workspace/${workspaceId}/posts-with-comments`);
}

export default {
  createPost,
  getAllCommentForGivenPost,
  getAllPost,
  postWithComment,
};

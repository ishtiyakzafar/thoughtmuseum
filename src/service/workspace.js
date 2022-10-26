import http from "./http";

function createWorkspace(data) {
  return http.post("workspace", data);
}

function getAllWorkSpace() {
  return http.get("workspace");
}

function deleteWorkspace(id) {
  return http.delete(`workspace/${id}`);
}

function updateWorkspace(id, data) {
  return http.put(`workspace/${id}`, data);
}

export default {
  createWorkspace,
  getAllWorkSpace,
  deleteWorkspace,
  updateWorkspace,
};

import React from "react";
import CreateWorkspace from "../createworkspace/CreateWorkspace";
import "./WorkspaceHeader.css";
import { useSelector } from "react-redux";

const WorkspaceHeader = ({ fetchAllWorkSpace }) => {
  const { user } = useSelector((state) => state.userStore);

  return (
    <div className="heading ">
      <h2>My Workspaces</h2>
      {user?.role === "teacher" ? (
        <CreateWorkspace fetchAllWorkSpacedd={fetchAllWorkSpace} />
      ) : (
        ""
      )}
    </div>
  );
};

export default WorkspaceHeader;

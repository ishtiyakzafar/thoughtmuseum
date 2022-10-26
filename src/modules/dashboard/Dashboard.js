import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboardheader/DashboardHeader";
import WorkspaceCard from "../../components/workspacecard/WorkspaceCard";
import WorkspaceHeader from "../../components/workspaceheader/WorkspaceHeader";
import "./Dashboard.css";
import workspaceServ from "../../service/workspace";
import Loader from "../../components/loader";
import { Alert, message } from "antd";
import { useSelector } from "react-redux";
import userServ from "../../service/user";

const Dashboard = () => {
  const [workspace, setWorkspace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.userStore);

  const fetchAllUser = async () => {
    try {
      userServ.getAllUser();
    } catch (err) {
      message.error("Unable to fetch student, please reload. Reason: " + err);
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchAllWorkSpace = async () => {
    try {
      const res = await workspaceServ.getAllWorkSpace();
      setWorkspace(res.workspaces);
    } catch (err) {
      message.error(
        "Unable to fetch workspaces, please reload. Reason: " + err
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await fetchAllUser();
    await fetchAllWorkSpace();
  }, []);

  return (
    <div className="dashboard">
      <DashboardHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="workspace container">
          <WorkspaceHeader fetchAllWorkSpace={fetchAllWorkSpace} />

          {workspace?.length === 0 ? (
            <div className="work-message">
              <Alert
                message={
                  user.role === "teacher"
                    ? "No workspace available!"
                    : "No workspace available! Please contact your teacher."
                }
                type="warning"
              />
            </div>
          ) : (
            <div className="workspce-card ">
              {workspace.map((work) => (
                <WorkspaceCard
                  key={work?.workspace?.id}
                  count={work.count}
                  workspace={work.workspace}
                  fetchAllWorkSpace={fetchAllWorkSpace}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

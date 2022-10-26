import React from "react";
import "./MyclassHeader.css";
import { images } from "../../assets/images";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../loader";

const MyclassHeader = ({ workSpace, workspaceLoading }) => {
  const studentNamesss = new URLSearchParams(useLocation().search).get("user");
  const { user } = useSelector((state) => state.userStore);

  return (
    <>
      {workspaceLoading ? (
        <Loader />
      ) : (
        <div className="myclass-haeding">
          <img src={images.banner} alt="homework" />
          <div className="myclass-content">
            <h1>{workSpace?.title}</h1>
            <p className="desc">{workSpace?.description}</p>
            <p>
              <span className="name">{user.firstName}</span> with{" "}
              <span className="name">{studentNamesss}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyclassHeader;

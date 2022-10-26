import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "./Breadcrum.css";

const Breadcrum = ({ workSpace }) => {
  return (
    <div className="prev-link">
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to="/">My workspaces</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="class-title">
          {workSpace?.title}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrum;

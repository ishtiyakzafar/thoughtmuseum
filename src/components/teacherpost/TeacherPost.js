import React from "react";
import "./TeacherPost.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";

const TeacherPost = ({ item, userName }) => {
  return (
    <div className="teacher-post">
      <div className="user-icon">
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
      <div>
        <p>
          <strong>{item.title}</strong>
        </p>
        <p>
          {userName.firstName} {userName.lastName}
        </p>
        <small>{moment(item.createdAt).utc().format("MMM Do")}</small>
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default TeacherPost;

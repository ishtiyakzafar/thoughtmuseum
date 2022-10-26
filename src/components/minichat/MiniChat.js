import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./MiniChat.css";

const MiniChat = ({ item, showMessenger }) => {
  return (
    <div
      className="mini-chat"
      key={item.id}
      tabIndex={item.id}
      onClick={() => showMessenger(item.id)}
    >
      <div className={item.status ? "dot-online" : "dot"}></div>
      <Avatar size={45} icon={<UserOutlined />} />
      <div className="content">
        <p className="name">
          {item.firstName} {item.lastName}
        </p>
        {/* <p className="last-msg">You: {item.lastmsg}</p> */}
      </div>
    </div>
  );
};

export default MiniChat;

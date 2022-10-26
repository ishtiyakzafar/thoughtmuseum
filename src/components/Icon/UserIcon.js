import React from "react";
import { images } from "../../assets/images";
import "./Icon.css";

const UserIcon = () => {
  return (
    <span className="icon">
      <img src={images.userIcon} alt="Twitter" />
    </span>
  );
};

export default UserIcon;

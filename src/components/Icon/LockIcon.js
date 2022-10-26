import React from "react";
import { images } from "../../assets/images";
import "./Icon.css";

const LockIcon = () => {
  return (
    <span className="icon">
      <img src={images.lockIcon} alt="Twitter" />
    </span>
  );
};

export default LockIcon;

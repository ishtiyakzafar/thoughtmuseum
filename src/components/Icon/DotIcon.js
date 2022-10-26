import React from "react";
import { images } from "../../assets/images";
import "./Icon.css";

const DotIcon = () => {
  return (
    <span className="icon">
      <img src={images.dotIcon} alt="dotIcon" />
    </span>
  );
};

export default DotIcon;

import React from "react";
import { Button } from "antd";
import "./LinkButton.scss";

const LinkButton = (props) => {
  return (
    <Button
      icon={props.icon}
      href={props.url}
      className={`linkBtn ${props.className}`}
      type="link"
      onClick={props.onClick}
      target={props.navigate}
    >
      {props.text}
    </Button>
  );
};

export default LinkButton;

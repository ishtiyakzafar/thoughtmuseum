import React from "react";
import "./SigninSignupLayout.css";
import { images } from "../../assets/images";

const SigninSignupLayout = (props) => {
  return (
    <div className="loginPage">
      <div className="login-bg">
        <img src={images.loginbg} alt="bg" />
      </div>
      <div className="photo">
        <img src={images.photo} alt="photo" />
      </div>
      <div className="logo">
        <img src={images.logo} alt="logo" />
      </div>
      <div className="left-circle">
        <img src={images.leftCircle} alt="circle" />
      </div>
      <div className="right-circle">
        <img src={images.rightCircle} alt="circle" />
      </div>
      {props.children}
    </div>
  );
};

export default SigninSignupLayout;

import { Checkbox, Form, message, Button, Input, Row, Col } from "antd";
import React, { useState, Fragment } from "react";
import FormControl from "../formcontrol/FormControl";
import UserIcon from "../Icon/UserIcon";
import LinkButton from "../LinkButton/LinkButton";
import "./LoginForm.scss";
import auth from "../../service/auth";
import { actionLogin } from "../../store/reducer/user";
import { PoweroffOutlined } from "@ant-design/icons";
import { MSG_DURATION } from "../../common/constants";
import { useDispatch } from "react-redux";
import LockIcon from "../Icon/LockIcon";
import { Link, NavLink } from "react-router-dom";

const LoginForm = () => {
  //state
  const [loading, setLoading] = useState(false);

  //redux
  const dispatch = useDispatch();

  //handler
  // const handleSignin = async (loginInfo) => {
  //   setLoading(true);
  //   try {
  //     const res = await auth.login(loginInfo);
  //     const { accessToken: token, userDto: user } = res;

  //     if (user?.roles == "ADMIN") {
  //       dispatch(actionLogin(user, token)); //store in redux and mark as login
  //     } else {
  //       message.error(
  //         "Unauthorized: Access is denied due to invalid credentials",
  //         MSG_DURATION
  //       );
  //     }
  //   } catch (err) {
  //     message.error("Login Fail. Reason: " + err, MSG_DURATION);
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Form
      name="normal_login"
      autoFocus={true}
      className="login-form"
      // onFinish={handleSignin}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Email is required!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input prefix={<UserIcon />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password is required!" }]}
      >
        <Input.Password
          prefix={<LockIcon />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <div className="forgot-pass">
        <Checkbox>Remember me</Checkbox>

        <LinkButton className="login-form-forgot" text="Forgot password" />
      </div>

      <Form.Item className="submitItem">
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="login-form-button"
        >
          Login
        </Button>
      </Form.Item>
      <div className="line">
        <p></p>
        <p></p>
      </div>
      <div className="login-footer">
        <p>Not a member?</p>
        <p>Create Account</p>
      </div>
    </Form>
  );
};

export default LoginForm;

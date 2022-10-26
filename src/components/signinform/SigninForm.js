import React, { useState } from "react";
import "./SigninForm.css";
import { Form, Button, Input, Row, Col, message } from "antd";
import LockIcon from "../../components/Icon/LockIcon";
import UserIcon from "../../components/Icon/UserIcon";
import userServ from "../../service/user";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../store/reducer/user";
import { Link } from "react-router-dom";

const SigninForm = () => {
  //state
  const [isloading, setIsLoading] = useState(false);

  //redux
  const dispatch = useDispatch();

  //handler
  const handleSignin = async (loginInfo) => {
    setIsLoading(true);
    try {
      const res = await userServ.login(loginInfo);
      const { token, user } = res;

      dispatch(actionLogin(user, token)); //store in redux and mark as login
      console.log("checkuserid", user.id);
      // socket.emit("join", user.id);
    } catch (err) {
      message.error("Login Fail. Reason: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Row className="signin-container">
      <Col xs={22} sm={22} md={13} lg={10} xl={7} className="signin-form">
        <h1>LOGIN</h1>
        <Form name="normal_login" autoFocus={true} onFinish={handleSignin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "User name is required!" }]}
          >
            <Input prefix={<UserIcon />} placeholder="User Name" />
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

          <Form.Item className="submitItem">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="login-form-button"
              loading={isloading}
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
            <p>
              <Link to={"/signup"}>Create Account</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SigninForm;

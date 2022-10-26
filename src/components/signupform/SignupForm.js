import React, { useState } from "react";
import "./SignupForm.css";
import { Radio, Form, Button, Input, Row, Col, message } from "antd";
import LockIcon from "../../components/Icon/LockIcon";
import UserIcon from "../../components/Icon/UserIcon";
import { Link, useHistory } from "react-router-dom";
import userServ from "../../service/user";

const SignupForm = () => {
  const [valued, setValue] = React.useState(1);
  const [role, setRole] = useState("teacher");
  const [isloading, setIsLoading] = useState(false);

  //router
  const history = useHistory();

  const handleSignup = async (value) => {
    setIsLoading(true);
    value.role = role;
    try {
      const res = await userServ.signup(value);
      message.success(res.message);
      setTimeout(() => history.push("/login"), 1000); //redirect to login
    } catch (err) {
      message.error("Unable to create new account. Reason: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === 1) {
      setRole("teacher");
    } else if (e.target.value === 2) {
      setRole("student");
    }
  };

  return (
    <Row className="signup-container">
      <Col xs={22} sm={22} md={13} lg={10} xl={7} className="signup-form">
        <h1>REGISTER</h1>
        <Form name="normal_login" autoFocus={true} onFinish={handleSignup}>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "First name is required!" }]}
          >
            <Input prefix={<UserIcon />} placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Last name is required!" }]}
          >
            <Input prefix={<UserIcon />} placeholder="Last Name" />
          </Form.Item>

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

          <div className="role">
            <Radio.Group onChange={onChange} value={valued}>
              <Radio value={1}>Teacher</Radio>
              <Radio value={2}>Student</Radio>
            </Radio.Group>
          </div>
          <Form.Item className="submitItem">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="login-form-button"
              loading={isloading}
            >
              Register
            </Button>
          </Form.Item>

          <div className="line">
            <p></p>
            <p></p>
          </div>

          <div className="login-footer">
            <p>Already a member?</p>
            <p>
              <Link to={"/login"}>Signin</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupForm;

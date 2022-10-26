import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboardheader/DashboardHeader";
import "./MyProfile.css";
import { Row, Col, Button, message, Modal, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UpdateProfile from "./UpdateProfile";
import userServ from "../../service/user";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout } from "../../store/reducer/user";

const { confirm } = Modal;

const MyProfile = () => {
  const { user } = useSelector((state) => state.userStore);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUserById = async () => {
    try {
      const res = await userServ.getUserById(user.id);
      setUserData(res.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  const deleteProfile = async () => {
    try {
      const res = await userServ.deleteUser();
      message.success(res.message);
      dispatch(actionLogout());
    } catch (err) {
      message.error("Unable to delete Profile, please reload. Reason: " + err);
    }
  };

  function confirmDeleteProfile() {
    confirm({
      title: "Are you sure delete this profile?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProfile();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <div>
      <DashboardHeader />
      <div className="container">
        <Row>
          <Col xs={24} sm={20} md={15} lg={11} xl={10} className="user-profile">
            <div className="header">
              <Avatar size={45} icon={<UserOutlined />} />
              <div className="action-btn">
                <UpdateProfile
                  userData={userData}
                  fetchUserById={fetchUserById}
                />
                <Button
                  type="danger"
                  onClick={confirmDeleteProfile}
                  className="delete"
                >
                  Delete
                </Button>
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                <p>First Name : {userData.firstName}</p>
                <p>Last Name : {userData.lastName}</p>
                <p className="user-name">User Name : {userData.username}</p>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyProfile;

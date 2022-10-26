import React, { useState, useEffect } from "react";
import "./WorkspaceCard.css";
import { Link } from "react-router-dom";
import userServ from "../../service/user";
import Loader from "../loader";
import { useSelector } from "react-redux";
import { Menu, Dropdown, message, Button, Modal, Input, Form } from "antd";
import DotIcon from "../Icon/DotIcon";
import workspaceServ from "../../service/workspace";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const WorkspaceCard = ({ workspace, count, fetchAllWorkSpace }) => {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.userStore);

  const fetchAllUser = async () => {
    try {
      if (user?.role === "teacher") {
        const res = await userServ.getUserById(workspace?.studentId);
        setUserData(res.user);
      } else if (user?.role === "student") {
        const res = await userServ.getUserById(workspace?.teacherId);
        setUserData(res.user);
      }
    } catch (err) {
      message.error("Unable to fetch student, please reload. Reason: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleUpdate = async (value) => {
    setIsUpdate(true);
    try {
      const res = await workspaceServ.updateWorkspace(workspace.id, value);
      message.success(res.message);
      fetchAllWorkSpace();
    } catch (err) {
      message.error(
        "Unable to update workspace, please reload. Reason: " + err
      );
    } finally {
      setIsUpdate(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await workspaceServ.deleteWorkspace(workspace.id);
      message.success(res.message);
      fetchAllWorkSpace();
    } catch (err) {
      message.error(
        "Unable to delete workspace, please reload. Reason: " + err
      );
    }
  };

  function confirmDeleteWorkspace() {
    confirm({
      title: "Are you sure delete this workspace?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item className="update" onClick={showModal}>
        Update
      </Menu.Item>
      <Menu.Item className="update" onClick={confirmDeleteWorkspace}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card">
          <div className="title">
            <h1>{workspace?.title}</h1>

            {user?.role === "teacher" ? (
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={["click"]}
              >
                <div>
                  <DotIcon />
                </div>
              </Dropdown>
            ) : (
              ""
            )}

            <Modal
              title="Update workspace"
              visible={isModalVisible}
              onCancel={handleCancel}
              width={400}
              footer={null}
              destroyOnClose={true}
            >
              <Form
                form={form}
                name="normal_modal"
                autoFocus={true}
                onFinish={handleUpdate}
                preserve={false}
              >
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "Title is required!" }]}
                  initialValue={workspace?.title}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Description is required!" },
                  ]}
                  initialValue={workspace?.description}
                >
                  <Input placeholder="Description" />
                </Form.Item>

                <Form.Item className="create-btn">
                  <Button type="primary" htmlType="submit" loading={isUpdate}>
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="body">
            <p className="disc">{workspace?.description}</p>
            <p>
              <strong>{user.role === "teacher" ? "Student" : "Teacher"}</strong>{" "}
              : {userData?.firstName} {userData?.lastName}
            </p>
            <Link
              to={`/myclass?workspaceId=${workspace?.id}&user=${userData?.firstName}`}
            >
              View Now
            </Link>
          </div>
          <div className="footer">
            <p>
              Post: {count?.post} | Comment:{" "}
              {count?.comment.length == 0 ? 0 : count?.comment}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkspaceCard;

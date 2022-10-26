import React, { useEffect, useState } from "react";
import "./CreateWorkspace.css";
import userServ from "../../service/user";
import { Modal, Button, Input, Form, Select, message } from "antd";
import { useSelector } from "react-redux";
import workspaceServ from "../../service/workspace";

const { Option } = Select;

const CreateWorkspace = ({ fetchAllWorkSpacedd }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const [form] = Form.useForm();

  const { user, chatUsers } = useSelector((state) => state.userStore);

  const handleCreateWorkspace = async (workspaceInfo) => {
    setIsLoading(true);
    workspaceInfo.teacherId = user.id;

    try {
      const res = await workspaceServ.createWorkspace(workspaceInfo);
      message.success(res.message);
      fetchAllWorkSpacedd();
    } catch (err) {
      message.error(
        "Unable to create workspace, please reload. Reason: " + err
      );
    } finally {
      form.resetFields();
      setIsLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //GET ALL STUDENT TO CREATE WORKSPACE
  const fetchAllUser = async () => {
    try {
      userServ.getAllUser();
    } catch (err) {
      message.error("Unable to fetch student, please reload. Reason: " + err);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  useEffect(() => {
    const user = chatUsers?.filter((item) => item.role === "student");
    setStudent(user);
  }, [chatUsers])

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add workspace
      </Button>
      <Modal
        title="Add new workspace"
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
          onFinish={handleCreateWorkspace}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item
            name="studentId"
            rules={[{ required: true, message: "Student is required" }]}
          >
            <Select defaultValue="Student">
              {student.map((item, i) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.username}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item className="create-btn">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateWorkspace;

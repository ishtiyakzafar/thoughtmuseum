import React, { useState } from "react";
import { message, Button, Modal, Input, Form } from "antd";
import userServ from "../../service/user";

const UpdateProfile = ({ userData, fetchUserById }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleUpdate = async (value) => {
    setIsUpdated(true);
    try {
      const res = await userServ.updateUser(value);
      message.success(res.message);
    } catch (err) {
      message.error("Unable to update Profile, please reload. Reason: " + err);
    } finally {
      fetchUserById();
      setIsUpdated(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Update Profile
      </Button>
      <Modal
        title="Update Profile"
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
          <label>First Name</label>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "First name is required!" }]}
            initialValue={userData.firstName}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <label>Last Name</label>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Last name is required!" }]}
            initialValue={userData.lastName}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item className="update-btn">
            <Button type="primary" htmlType="submit" loading={isUpdated}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateProfile;

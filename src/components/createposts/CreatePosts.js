import React, { useState } from "react";
import "./CreatePosts.css";
import { Button, Input, Form, message, Collapse } from "antd";
import postServ from "../../service/post";
import { useLocation } from "react-router-dom";
import Loader from "../loader";

const { Panel } = Collapse;

const CreatePosts = ({ workspaceLoading, fetchPostWithcomment }) => {
  const workSpaceId = new URLSearchParams(useLocation().search).get(
    "workspaceId"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  //CREATE POST BY TEACHER
  const handleCreatePost = async (value) => {
    setIsLoading(true);
    value.workspaceId = workSpaceId;

    try {
      const res = await postServ.createPost(value);
      message.success(res.message);
    } catch (err) {
      message.error("Unable to create Post, please reload. Reason: " + err);
    } finally {
      fetchPostWithcomment();
      form.resetFields();
      setIsLoading(false);
    }
  };

  return (
    <>
      {workspaceLoading ? (
        <Loader />
      ) : (
        <div className="add-post">
          <Collapse ghost={true}>
            <Panel header="Add new post" key="1">
              <Form
                form={form}
                name="normal_modal"
                autoFocus={true}
                onFinish={handleCreatePost}
              >
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "Title is required!" }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  name="content"
                  rules={[{ required: true, message: "Content is required!" }]}
                >
                  <Input placeholder="Content" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Post
                  </Button>
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default CreatePosts;

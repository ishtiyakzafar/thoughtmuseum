import React, { useState } from "react";
import "./PostwithComment.css";
import { UserOutlined } from "@ant-design/icons";
import { Button, Avatar, Input, Form, Collapse, message } from "antd";
import TeacherPost from "../teacherpost/TeacherPost";
import Loader from "../loader";
import commentServ from "../../service/comment";
import moment from "moment";

const { Panel } = Collapse;

const PostwithComment = ({
  postWithComment,
  userName,
  postwithCommentLoading,
  fetchPostWithcomment,
}) => {
  const [isCreateComment, setIsCreateComment] = useState(false);
  const [form] = Form.useForm();

  //CREATE COMMENT
  const handleCreateComment = async (value) => {
    setIsCreateComment(true);
    try {
      const res = await commentServ.createComment(value);
      message.success(res.message);
    } catch (err) {
      message.error("Unable to create comment, please reload. Reason: " + err);
    } finally {
      form.resetFields();
      fetchPostWithcomment();
      setIsCreateComment(false);
    }
  };

  return (
    <>
      {postwithCommentLoading ? (
        <Loader />
      ) : (
        <>
          {postWithComment.map((item) => (
            <div key={item.id} className="postwithcomment">
              <Collapse ghost={true} collapsible="header">
                <Panel
                  header={<TeacherPost item={item} userName={userName} />}
                  key={item.id}
                  showArrow={false}
                >
                  {item?.comments.map((item) => (
                    <div key={item.id} className="comment">
                      <div className="user-icon">
                        <Avatar size={40} icon={<UserOutlined />} />
                      </div>
                      <div>
                        <p>
                          {item.user.firstName} {item.user.lastName}
                        </p>
                        <small>
                          {moment(item.createdAt).utc().format("MMM Do")}
                        </small>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  ))}

                  <Form
                    key={item.id}
                    preserve={false}
                    className="post-with-comment"
                    form={form}
                    name="normal_modal"
                    autoFocus={true}
                    onFinish={(value) =>
                      handleCreateComment({ ...value, postId: item.id })
                    }
                  >
                    <Form.Item
                      name="content"
                      rules={[
                        { required: true, message: "Comment is required!" },
                      ]}
                    >
                      <Input placeholder="Comment" />
                    </Form.Item>

                    <Form.Item className="comment-btn">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isCreateComment}
                      >
                        Comment
                      </Button>
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PostwithComment;

import React, { useEffect, useState } from "react";
import "./Myclass.css";
import { Row, Col } from "antd";
import DashboardHeader from "../../components/dashboardheader/DashboardHeader";
import postServ from "../../service/post";
import userServ from "../../service/user";
import workspaceServ from "../../service/workspace";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Breadcrum from "../../components/breadcrum/Breadcrum";
import CreatePosts from "../../components/createposts/CreatePosts";
import MyclassHeader from "../../components/myclassheading/MyclassHeader";
import PostwithComment from "../../components/postwithcomment/PostwithComment";

const Myclass = () => {
  const workSpaceId = new URLSearchParams(useLocation().search).get(
    "workspaceId"
  );
  const { user } = useSelector((state) => state.userStore);
  const [workSpace, setworkSpace] = useState({});
  const [postWithComment, setPostWithComment] = useState([]);
  const [userName, setUserName] = useState({});
  const [workspaceLoading, setWorkspaceLoading] = useState(true);
  const [postwithCommentLoading, setPostwithCommentLoading] = useState(true);

  //FETCH WORK SPACE FOR TITLE AND DESC
  const fetchAllworkSpace = async () => {
    try {
      const res = await workspaceServ.getAllWorkSpace();
      const work = res.workspaces.filter(
        (item) => item.workspace?.id == workSpaceId
      );
      setworkSpace(work[0]?.workspace);
    } catch (error) {
      console.log(error);
    } finally {
      setWorkspaceLoading(false);
    }
  };

  //FETCH USER FOR
  const fetchUserById = async (id) => {
    try {
      const res = await userServ.getUserById(id);
      setUserName(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostWithcomment = async () => {
    try {
      const res = await postServ.postWithComment(workSpaceId);
      fetchUserById(res.posts[0]?.userId);
      setPostWithComment(res.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setPostwithCommentLoading(false);
    }
  };

  useEffect(() => {
    fetchPostWithcomment();
    fetchAllworkSpace();
  }, []);

  return (
    <div className="myclass ">
      <DashboardHeader />
      <div className="container">
        <Breadcrum workSpace={workSpace} />

        <Row>
          <Col xs={24} sm={24} md={10} lg={10} xl={15} className="chat-section">
            <MyclassHeader
              workSpace={workSpace}
              workspaceLoading={workspaceLoading}
            />
            {user.role === "teacher" ? (
              <CreatePosts
                workspaceLoading={workspaceLoading}
                fetchPostWithcomment={fetchPostWithcomment}
              />
            ) : (
              ""
            )}

            {postWithComment.length > 0 ? (
              <PostwithComment
                postWithComment={postWithComment}
                userName={userName}
                postwithCommentLoading={postwithCommentLoading}
                fetchPostWithcomment={fetchPostWithcomment}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Myclass;

import React from "react";
import { Layout } from "antd";
import { withRouter } from "react-router";

import "./Layout.scss";

const { Content } = Layout;

const MainLayout = ({ children, history }) => {
  return (
    <Layout className="main-layout">
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(MainLayout);

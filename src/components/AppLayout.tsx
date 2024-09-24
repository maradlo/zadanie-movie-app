import React, { useState } from "react";
import { Layout, Menu, Badge } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { SearchOutlined, StarOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "/" : location.pathname;
  const favouriteCount = useAppSelector(
    (state) => state.favourites.favourites.length
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="/" icon={<SearchOutlined />}>
            <Link to="/">Movie Search</Link>
          </Menu.Item>
          <Menu.Item key="/favourites" icon={<StarOutlined />}>
            <Link to="/favourites">
              Favourite Movies{" "}
              {favouriteCount > 0 && (
                <Badge
                  count={favouriteCount}
                  offset={[10, 0]}
                  style={{ backgroundColor: "#fadb14" }}
                />
              )}
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "inherit",
            padding: 0,
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "white", margin: 0 }}>Movie App</h1>
        </Header>

        <Content style={{ margin: 0, padding: "16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Movie App ©{new Date().getFullYear()} Created by Marek Žáčik
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;

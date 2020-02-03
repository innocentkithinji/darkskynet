import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import CurratedMap from "./Map";
import { connect } from "react-redux";
import { loadlocation } from "../actions";
import WeatherDetails from "./WeatherDetails";

const { Sider, Content } = Layout;

class Home extends Component {
  state = { collapsed: true };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.props.loadlocation}>
              <Icon type="info" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              background: "#F7F5F5",
              minHeight: 280
            }}
          >
            <div
              style={{
                height: "100%",
                width: "66%",
                display: "inline-block",
                position: "relative"
              }}
            >
              <CurratedMap />
            </div>
            <div
              style={{
                height: "100%",
                float: "right",
                width: "33%",
                display: "inline-block",
                backgroundImage:
                  "url('https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",
                backgroundSize: "cover",
              }}
            >
              <WeatherDetails/>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ isLoading, location, errors }) => ({
  isLoading,
  location,
  errors
});

const mapDispatchToProps = dispatch => ({
  loadlocation: () => dispatch(loadlocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

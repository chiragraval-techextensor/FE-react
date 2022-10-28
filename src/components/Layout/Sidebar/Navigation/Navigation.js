import React, {Component} from 'react'
import { Menu  } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import './Navigation.css';
const { SubMenu } = Menu;
class Navigation extends Component {
  state = {}
  render(){
    return (<div>
     <Menu className="customNavigation"
          defaultSelectedKeys={['1']}

          mode="inline"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Analysis
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Visual Event
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </Menu>
    </div>);
  }
}

export default Navigation;
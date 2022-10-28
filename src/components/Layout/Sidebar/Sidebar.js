import React, {Component} from 'react'
import { Space  } from 'antd';
import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import './Sidebar.css';
class Sidebar extends Component {
  state = {}
  render(){
    return (<div className="sidebar">
     <Space direction="vertical" className="sidebarItems">
        <Logo />
        <Navigation />
    </Space>
    </div>);
  }
}

export default Sidebar;
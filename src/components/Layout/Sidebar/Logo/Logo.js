import React, {Component} from 'react'
import { Layout  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Logo.css';
const { Header, Content, Sider } = Layout;
class Logo extends Component {
  state = {}
  render(){
    return (
      <div>
        <Content className="Logo">
          <p><FontAwesomeIcon icon="chart-bar" /> <span>Element Hacker</span></p>
        </Content>
      
      </div>
    );
  }
}

export default Logo;
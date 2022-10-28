import React, {Component} from 'react'
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import './ContentTab.css';
class ContentTab extends Component {
  state = {
    current: this.props.tabs[0].name,
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render(){
    const { current } = this.state;

    return (<div>
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{borderBottom: "solid 2px #eaeaea"}}>
        {/* {this.props.tabs.each} */}
        {this.props.tabs.map(tab => (
        <Menu.Item style={{padding: "0px 25px"}}
          key={tab.name}
          >  <FontAwesomeIcon style={{fontSize: "1.4em"}} icon={tab.icon} />
          </Menu.Item>
        ))}
      </Menu>
    </div>);
  }
}

export default ContentTab;
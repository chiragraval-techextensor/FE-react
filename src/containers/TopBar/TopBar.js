import React, {Component} from 'react'
import { Row, Col } from 'antd'
import SearchSection from './SearchSection/SearchSection'
import UserSettings from './UserSettings/UserSettings'
import './TopBar.css';
class TopBar extends Component {
  state = {}
  render(){
    return (<div className="TopBar">
      <Row>
        <Col span={6} push={18}>
          <UserSettings />
        </Col>
        <Col span={18} pull={6}>
          <SearchSection />
        </Col>
        
      </Row>
    </div>);
  }
}

export default TopBar;
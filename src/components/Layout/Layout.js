import React, {Component} from 'react'
import { Layout as MainLayout, Row, Col } from 'antd';
import Sidebar from './Sidebar/Sidebar'
import TopBar from './../../containers/TopBar/TopBar'
import './Layout.css';
import { white } from 'color-name';
class Layout extends Component {
  state = {}
  render(){
    return (<div>
     <MainLayout className="mainLayout">
      <Row>
          <Col span={6}><Sidebar /></Col>
          <Col style={{ background: white }} span={18} >
          <div className="MainContent">
            <div className="MainContent-TopBar">
              <TopBar />
            </div>
            <div className="ContentSection">
              <div className="ContentContainer">
                {this.props.children}
              </div>
            </div>
          </div>

          </Col>
      </Row>
     </MainLayout>
    </div>);
  }
}

export default Layout;
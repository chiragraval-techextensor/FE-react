import React from 'react';
import Navigation from '../../components/Layout/Navigation/Navigation'
import AddEvent from '../../components/Dashboard/Events/EventDefination/AnalyzeEvents/AddEvent/AddEvent'
import { Layout, Menu, Input, Typography, Select } from 'antd';
import {
  MailOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import Visitorslist from './VisitorsList';
const { Header, Sider, Content } = Layout;
class Visitors extends React.Component {
  constructor(){
    super();
    
		this.state = {
			current: 'event_section',
		}
 	}
  
  
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
  
    });
    };
  render(){
    return(
      <Navigation >
        
					<Content
						style={{minHeight: 900}}>
						<Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className="grey-bg">
										<Menu.Item key="event_section" icon={<MailOutlined />}>
														All Users
										</Menu.Item>
						</Menu>
            <Content className="event-section" style={{margin: '18px 0px'}}>				
              <AddEvent/>
            </Content>
            <Visitorslist />
          </Content>
      </Navigation>
    )
  }
}

export default Visitors;
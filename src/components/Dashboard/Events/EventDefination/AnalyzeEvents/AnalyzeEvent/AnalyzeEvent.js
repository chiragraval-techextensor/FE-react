import React from 'react'
import { Row, Col, Button } from 'antd';
import AddEvent from '../AddEvent/AddEvent'
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import { throwStatement } from '@babel/types';
class AnalyzeEvent extends React.Component {
  delete(id){
    this.props.delete(id);
  }
  render(){
   
  return (
    <div>
      {
      this.props.data.map(el=>
        <Row justify="left" style={{marginBottom: "10px"}} key={el}>
            <Col span={20}>
              
              <Row justify="start">
                <Col span={24}>
                  <AddEvent pkey={el}/>
                </Col>
              </Row>
          </Col>
          {this.props.data.length > 1 ? <Col span={4}><Button icon={<PlusCircleOutlined />} onClick={this.delete.bind(this, el)}  >Remove Event</Button></Col> : null}
          
        </Row>
      )
      }
    </div>
    
    
  )
  }
}
export default AnalyzeEvent;


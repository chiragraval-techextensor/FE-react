import React, {Component} from 'react'
import { render } from '@testing-library/react';
import { Select, Spin, Col , Row, Space} from 'antd';
import LoadProperty from './LoadProperty/LoadProperty'
import debounce from 'lodash/debounce';
const { Option } = Select;


class EventProperty extends Component {
	state = {
    data: [{value: 'path', text: 'xyz.com'},{value: 'browser', text: 'chrome'} ],
    value: [],
    fetching: false,
    propertiesLoaded: true,
    propertySelected: true,
    propertiesValueLoaded: true
  };

  
	render(){
    const { data } = this.state;
    let propertiesLoaded = this.state.propertiesLoaded;
		let propertiesValueLoaded = this.state.propertiesValueLoaded;
    function onChange(value) {
      console.log(`selected ${value}`);
    }

    function onBlur() {
      console.log('blur');
    }

    function onFocus() {
      console.log('focus');
    }

    function onSearch(val) {
      console.log('search:', val);
    }
    let propertiesValueShow;
    if (this.state.propertySelected == true){
      propertiesValueShow = 
          <Space>
            <Col span={8}>
              <Select defaultValue="is" style={{width: "80px"}}>
                <Option value="is">is</Option>
                <Option value="isNot">is not</Option>
                <Option value="contains">contains</Option>
              </Select>
            </Col>
            <Col span={8}>
              {propertiesValueLoaded ? <LoadProperty data={data} mode="tags" showSearch={true} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onSearch={onSearch} placeholder={"Select Property Value"} /> : <Select defaultValue="Fetching" loading></Select>}
            </Col>
          </Space>
    }
    else {
      propertiesValueShow = null
    }
		return (
      <div>
        <Row>
          <Col span={8}>
            {propertiesLoaded ?  <LoadProperty data={data} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onSearch={onSearch} placeholder={"Select Property"}/> : <Select defaultValue="Fetching" loading></Select>}
          </Col>
        
        
        {propertiesValueShow}
        </Row>
      </div>
		);
	}
}

export default EventProperty
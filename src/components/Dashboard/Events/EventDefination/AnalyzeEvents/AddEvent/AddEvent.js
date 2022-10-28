import React, {Component} from 'react'
import {  Row, Col, Select, Button } from 'antd';
import {
	CloseCircleOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import EventProperty from '../../EventProperty/EventProperty';
const { Option, OptGroup } = Select;

class AddEvent extends Component {
	state = {
		addFilter: false,
		disaplyClose: true
	}
	enableApplyProperties = () => {
		this.setState({addFilter: false, disaplyClose: true});
	}
	disableApplyProperties = () => {
		this.setState({addFilter: true, disaplyClose: false});
	}
	render (){
		let disaplyClose = this.state.disaplyClose;
		let AddFilerOrSelectProps;
		if (this.state.addFilter === true){
			AddFilerOrSelectProps =  <Button icon={<PlusCircleOutlined/>} onClick={this.enableApplyProperties}>Add Filters</Button>
		}
		else {
			AddFilerOrSelectProps =  <EventProperty />
		}
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
		
		
		return(
			<Row align="middle">
				<Col span={7}>
					<Select
							showSearch
							style={{ width: 250 }}
							placeholder="Select an Event"
							optionFilterProp="children"
							onChange={onChange}
							onFocus={onFocus}
							onBlur={onBlur}
							onSearch={onSearch}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value="PageView">Page Views</Option>
							<Option value="ClickedOnLogin">Clicked on Login</Option>
							<Option value="SignedUp">Signed up</Option>
					</Select>
				</Col>
				<Col span={13}>
					
					{AddFilerOrSelectProps}
				</Col>
				{disaplyClose ? <Col span={2}><span onClick={this.disableApplyProperties}><CloseCircleOutlined  /></span></Col> : null}
				
			</Row>
		)
	}
}
export default AddEvent;
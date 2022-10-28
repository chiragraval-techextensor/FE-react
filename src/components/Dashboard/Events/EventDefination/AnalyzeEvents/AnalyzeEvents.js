import React, {Component} from 'react'
import { Layout, Row, Col, Divider, Button, Space } from 'antd';
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import AddEvent from './AddEvent/AddEvent';
import AnalyzeEvent from './AnalyzeEvent/AnalyzeEvent'
const { Content } = Layout;

class AnalyzeEvents extends Component {
	constructor(){
		super();
		this.state = {
			data: [1,2,3,4,5],
			InputType: ["a", "b", "c", "d", "e"] ,
			shop: [
				{id: 35, name: 'jumper', color: 'red', price: 20},
				{id: 42, name: 'shirt', color: 'blue', price: 15},
				{id: 56, name: 'pants', color: 'green', price: 25},
				{id: 71, name: 'socks', color: 'black', price: 5},
				{id: 72, name: 'socks', color: 'white', price: 5},
		]
		}
		this.delete = this.delete.bind(this);
		// this.delete = this.delete.bind(this);
 }
	

	
	addInput = (type, key) => {
		const InputType = this.InputBox[type]
	}

	demoFunc = (key)  => {
		let newShop = [...this.state.shop]
		console.log(newShop)
		let newItems = newShop.filter(item => (item.id !== key));
		console.log("again " + newItems)
		this.setState({
			shop: newItems	
		})
		console.log("demo passing" + key)
	}

	// removeEvent = (index) => {
	// 	console.log("hjsdkfhk")
	// 	this.setState(({ InputType }) => {
	// 		const mQuestions = [ ...InputType ]
	// 		mQuestions.splice(index, 1)
  //     // let updatedKeys = mQuestions.filter(item => item !== key)
  //     return { questions: mQuestions }
  //   })
	// }
		delete(id){
			this.setState(prevState => ({
					data: prevState.data.filter(el => el != id )
			}));
	}

	removeEvent = (index) => {
		console.log("starting")
		this.setState(prevState => ({
			InputType: prevState.InputType.filter(el => el != index )
		}));
		console.log(this.state.InputType.filter(el => el != index ))
		// console.log(this.state.InputType)
		// const newInputbox = [...this.state.InputType];
		// // delete newInputbox[index];  
		// // newInputbox.splice(index, 1)
		// // const updatedKeys = newInputbox.filter(item => item !== key)
    // // const index = newState.InputBox.findIndex(a => a === key);

    // // if (index === -1) return;
    // newInputbox.splice(index, 1);
		// this.setState({InputType: newInputbox}, 	function() {console.log(this.state)});
    // // this.setState(newState);
		// // const updatedKeys = this.state.InputBox.filter(item => item !== key)
		// console.log("remove key	" + index)
		// console.log("pending keys key	", newInputbox)
		// console.log(this.state.InputType)
	}
	render(){
		// let eventBind = this.removeEvent.bind(this)
		// var lists = this.state.InputBox.map((value) => {
		// 	return <AnalyzeEvent keyItem={value} removeElement={this.demoFunc.bind(this)}/>
		// 	});
    return(
			<Content className="event-section" style={{margin: '18px 0px'}}>				
				{/* Event Analyser box */}
				<p className="event-section-p">Analyze Event</p>	
					<AnalyzeEvent delete={this.delete} data={this.state.data}/>
				{/* {this.state.shop.map((item, key) =>
						<AnalyzeEvent keyItem={item.id} key={item.id} demo={this.demoFunc} />
				)} */}
				<Divider/>
				{/* Event Analyser box ends*/}

				{/* Event Analyser People box */}
				<p className="event-section-p">Who</p>
				<Row justify="center">
				
						<Col span={20}>
							
							<Row justify="start">
								<Col span={24}>
									<AddEvent />
									
								</Col>
							</Row>
					</Col>
					<Col span={4}><Button icon={<PlusCircleOutlined />}>Add Events</Button></Col>
				</Row>
				<Divider/>
				{/* Event Analyser people box ends*/}
				<Space>
				<Button icon={<PlusCircleOutlined />}>Group By</Button>
				<Button type="primary" className="analysis-button" >Run Analysis</Button>
				</Space>
					
		</Content>
		)
	}
}
export default AnalyzeEvents
import React, {Component} from 'react'
import { Select, Row, Col } from 'antd'
import * as actionTypes from '../../../../../store/actions/actionTypes'
import { connect } from "react-redux";
import './SelectUser.css'
import SelectUserSegment from './SelectUserSegment/SelectUserSegment';
const { Option, OptGroup } = Select;
class SelectUser extends Component {
  // state = {
  //   initial: 0
  //  }
  //   getID() {
  //     this.state.initial++
  //   }
  //   removeID() {
  //     this.state.initial--
  //   }

	render(){
    

		return(
      <div>
      {this.props.userSegments.map((segment, segmentIndex) => {
        return (<SelectUserSegment  key={segmentIndex} segment={segment} segmentIndex={segmentIndex}/>)
      })}
      </div>    
    )	
	}

}
const mapStateToProps = state => {
  return {
    userSegments: state.eventItem.UserSegments
  };
}
export default connect(mapStateToProps)(SelectUser);
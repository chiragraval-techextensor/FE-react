import React, {Component} from 'react'
import { Select, Row, Col } from 'antd'
import * as actionTypes from '../../../../store/actions/actionTypes'

import SelectEventItem from '../EventDefination/SelectEventItem/SelectEventItem'
import { connect } from "react-redux";
import './SelectEvent.css'
const { Option, OptGroup } = Select;
class SelectEvent extends Component {
  state = { }

	render(){
		return(
      <div>
      {this.props.eventItems.map((event, elementIndex) => {
        return (<SelectEventItem key={elementIndex} event={event} elementIndex={elementIndex}/>)
      })}
      </div>    
    )	
	}

}
const mapStateToProps = state => {
  return {
    eventItems: state.eventItem.EventItems
  };
}
export default connect(mapStateToProps)(SelectEvent);
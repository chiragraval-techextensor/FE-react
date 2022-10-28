import React, { Component } from 'react';
// import classes from './Event.css';
import EventList from './EventList/EventList';
import Where from '../../Conditions/Where/Where';
import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions'

class Event extends Component {

  render(){
    const eventNames = ["event 1", "event 2"]

    let EventOptions = []
    eventNames.map((event) => EventOptions.push(<option value={event}>{event}</option>) )
    let eventLists = "Loading"
    if (this.props.condition == true) {
      eventLists = <div><select id="lang" value={this.props.evt} onChange={(evt)=> this.props.onChangeHandler(evt)}  >{EventOptions}</select> <Where /></div>
    }
    else {
      eventLists = <div><select id="lang" value={this.props.evt} onChange={(evt) => this.props.onChangeHandler(evt)} >{EventOptions} </select> </div>   
    }
    
  return (
    <div>
    <h2> Select Your Event </h2>
        {eventLists}
    </div>
    
    )
  }

}

const mapStateToProps = state => {
  return {
    condition: state.addConditions,
    evt: state.optionValue
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeHandler: (evt) => dispatch(actionTypes.updateConditionNow(evt.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
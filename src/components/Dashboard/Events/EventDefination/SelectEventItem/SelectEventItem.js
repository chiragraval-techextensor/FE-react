import React, { useState} from 'react';
import { Select, Row, Col } from 'antd';
import Where from '../../EventDefination/Where/Where'
import * as actionTypes from '../../../../../store/actions/actionTypes'
import { connect } from "react-redux";
import * as eventsQuery from '../../../../../queries/eventInfoQuery'
import { useQuery } from '@apollo/client';

const { Option, OptGroup } = Select;

const SelectEventItem = props => {
    console.log("select event indise")
    const { loading, error, data } = useQuery(eventsQuery.GET_ALL_EVENTS)
    console.log(loading, error, data)
    let loaded;
    let conditionAvailable = props.event.conditions.length > 0
    let showCondition;
    let showConditionButton;
    if(conditionAvailable){
      showCondition =  <Row style={{marginTop:10}}>
                        <Col span={24}>
                            {props.event.conditions.map((condition, propertyIndex) => {
                              return <Where key={propertyIndex} conditionFor="EventItem" conditionData={condition} propertyIndex={propertyIndex} elementIndex={props.elementIndex} propertyItems={props.event.eventProperties} eventId={props.event.eventId}/>
                            })}
                        </Col>
                      </Row>
                      }

      else{
        showConditionButton = <span>
                                <button className="AddCondition"  onClick={(e)=> {console.log("multiple func"); props.onEventItemConditionAddHandler(props.elementIndex)}}>Where</button>
                              </span>
      }
      
    if (loading) {
      loaded = <Select value="Loading"></Select>
    }
    else {
      loaded  = 
        <Select value={props.event.eventName} style={{ width: 200 }} onChange={(e, option) =>{props.onEventItemChangeHandler(e, props.elementIndex, option)}}>
            {data.getAllEvents.map((val, i)=> {
              return (<Option key={i} name={val.id} value={val.name}>{val.name}</Option>)
            })}
        </Select>

    }

    return (
      <div key={props.elementIndex} className="SelectEvent">
        <Row>
        <Col span={18}>
        <Row>
        <Col span={24}>
          <span style={{ marginRight:10}}>
          <Select style={{ width: 100 }}  value={props.event.aggregationType}  onChange={e =>{props.onEventItemAggregatorChangeHandler(e, props.elementIndex)}}>
            {props.allAggregationType.map((val, i)=> {
              return (<Option key={i} value={val}>{val}</Option>)
            })}
          </Select>
          </span>
          <span>{loaded}</span>
          {showConditionButton}
          </Col>
        </Row>
        {showCondition}
          
        </Col>
        <Col span={6} >
        <button className="Delete"  onClick={() => props.onEventItemRemoveHandler(null, props.elementIndex)}>Delete</button>
        <button className="Add"  onClick={() => props.onEventItemAddHandler(null, props.elementIndex)}>Add</button>
        </Col>
        
      </Row>
      </div>
    )
  
  
};

const mapStateToProps = state => {
  return {
    eventItems: state.eventItem.EventItems,
    allAggregationType: state.eventItem.allAggregationType,
    allEvents: state.eventItem.allEvents
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onEventItemChangeHandler: (value, index, options) =>
      dispatch({ type: actionTypes.UPDATE_EVENT_ITEM, value: value, eventItemIndex: index, options: options }),
    onEventItemRemoveHandler: (_, index) =>
      dispatch({ type: actionTypes.REMOVE_EVENT_ITEM, eventItemIndex: index }),
    // onEventItemConditionChangeHandler: (value, type, index, eventItemId) =>
    //   dispatch({ type: actionTypes.UPDATE_EVENT_ITEM_CONDITION, value: value, propertyType: type,  condition_index: index, eventItemIndex: eventItemId, conditionFor: "EventItem" }),
    onEventItemAddHandler: () =>
      dispatch({ type: actionTypes.ADD_EVENT_ITEM }),
    onEventItemConditionAddHandler: (eventItemIndex) =>
      dispatch({ type: actionTypes.ADD_EVENT_ITEM_CONDITION, eventItemIndex: eventItemIndex, conditionFor: "EventItem"  }), 
    onEventItemAggregatorChangeHandler: (value, index) =>
      dispatch({ type: actionTypes.UPDATE_EVENT_ITEM_AGGREGATOR, value: value, eventItemIndex: index }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectEventItem);


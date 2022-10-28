import React, { } from "react";
import { Select, Row, Col } from "antd";
import * as actionTypes from "../../../../../store/actions/actionTypes";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Where.css";
import PropertyValue from "./PropertyValue";
import PropertyName from "./PropertyName";
import PropertyFilterType from './PropertyFilterType';
const { Option } = Select;
const Where = props => {
  let showPropertyName;
  let showPropertyFilterType;
  let showPropertyValue;
  if (props.eventId != null ){
    showPropertyName = <PropertyName propertyIndex={props.propertyIndex} propertyName={props.conditionData.propertyName} elementIndex={props.elementIndex} conditionFor={props.conditionFor} propertyItems={props.propertyItems} eventId={props.eventId} onEventItemConditionChangeHandler={props.onEventItemConditionChangeHandler}/>
  }
  if (props.conditionData.propertyName != null)
    showPropertyFilterType = <PropertyFilterType propertyIndex={props.propertyIndex} propertyFilterType={props.conditionData.propertyFilterType} elementIndex={props.elementIndex} conditionFor={props.conditionFor} propertyFilterTypes={props.allPropertyFilterType} eventId={props.eventId} onEventItemConditionChangeHandler={props.onEventItemConditionChangeHandler}/>

  if (props.conditionData.propertyName != null){
    showPropertyValue = <PropertyValue propertyIndex={props.propertyIndex} propertyName={props.conditionData.propertyName} propertyValue={props.conditionData.propertyValue} elementIndex={props.elementIndex} conditionFor={props.conditionFor} propertyValues={props.allEventValues} eventId={props.eventId} onEventItemConditionChangeHandler={props.onEventItemConditionChangeHandler}/>
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Row>
        <Col span={18}>
          <span>
            <div className="where">where</div>
          </span>
          {showPropertyName}
          {showPropertyFilterType}
          {showPropertyValue}
        </Col>
        <Col span={6}>
          <span
            onClick={() =>
              props.onEventItemConditionRemoveHandler(
                props.propertyIndex,
                props.elementIndex,
                props.conditionFor
              )
            }
          >
            <FontAwesomeIcon icon="trash-alt" />
          </span>
          <button
            className="Add"
            onClick={() =>
              props.onEventItemConditionAddHandler(
                props.elementIndex,
                props.conditionFor
              )
            }
          >
            Add
          </button>
        </Col>
      </Row>
    </div>
  );
 
}

const mapStateToProps = state => {
  return {
    eventItems: state.eventItem.EventItems,
    UserSegments: state.eventItem.UserSegments,
    allPropertyFilterType: state.eventItem.allPropertyFilterType,
    allEventValues: state.eventItem.allEventValues
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEventItemConditionChangeHandler: (
      value,
      type,
      index,
      eventItemId,
      conditionFor
    ) =>
      dispatch({
        type: actionTypes.UPDATE_EVENT_ITEM_CONDITION,
        value: value,
        propertyType: type,
        condition_index: index,
        eventItemIndex: eventItemId,
        conditionFor: conditionFor
      }),
    onEventItemConditionRemoveHandler: (
      propertyIndex,
      eventItemIndex,
      conditionFor
    ) =>
      dispatch({
        type: actionTypes.REMOVE_EVENT_ITEM_CONDITION,
        condition_index: propertyIndex,
        eventItemIndex: eventItemIndex,
        conditionFor: conditionFor
      }),
    onEventItemConditionAddHandler: (eventItemIndex, conditionFor) =>
      dispatch({
        type: actionTypes.ADD_EVENT_ITEM_CONDITION,
        eventItemIndex: eventItemIndex,
        conditionFor: conditionFor
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Where);

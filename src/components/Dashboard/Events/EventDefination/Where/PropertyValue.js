import React from "react";
import { Select, Row, Col } from "antd";
import { useQuery } from '@apollo/client';
import * as eventsQuery from '../../../../../queries/eventInfoQuery'
const { Option } = Select;
const PropertyValue = props => {
  const { loading, error, data } = useQuery(eventsQuery.GET_EVENT_PROPERTY_VALUES, {variables: {id:props.eventId, eventProperty: props.propertyName}})
  let loaded;
  if (loading){
    loaded =  <Select value="Loading" />
  }
  else{
    loaded = <Select
    key={props.propertyIndex}
    value={props.propertyValue}
    style={{ width: 120 }}
    onChange={e => {
      props.onEventItemConditionChangeHandler(
        e,
        "propertyValue",
        props.propertyIndex,
        props.elementIndex,
        props.conditionFor
      );
    }}
  >
    {data.getEventPropertyValues.map((val, ip) => {
      return (
        <Option key={ip} value={val}>
          {val}
        </Option>
      );
    })}
  </Select>
  }
  return (
    <span>
      {loaded}
    </span>
  )
}

export default PropertyValue;

            
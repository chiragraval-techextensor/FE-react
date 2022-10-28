import React from "react";
import { Select, Row, Col } from "antd";
import { useQuery } from '@apollo/client';
import * as eventsQuery from '../../../../../queries/eventInfoQuery'
const { Option } = Select;

const PropertyName = props => {
  const { loading, error, data } = useQuery(eventsQuery.GET_EVENT_PROPERTIES, {variables: {id:props.eventId}})
  let loaded;
  if (loading){
    return  <Select value="Loading" />
  }
  else{
    return <Select
        key={props.propertyIndex}
        value={props.propertyName}
        style={{ width: 120 }}
        onChange={e => {
          props.onEventItemConditionChangeHandler(
            e,
            "propertyName",
            props.propertyIndex,
            props.elementIndex,
            props.conditionFor
          );
        }}>
        {data.getEventProperty.map((val, ip) => {
          return (
            <Option key={ip} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
  }
  return(
    <span>
      {loaded}
    </span>
  )
}

export default PropertyName;
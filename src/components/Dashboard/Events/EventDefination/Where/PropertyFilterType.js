import React from "react";
import { Select, Row, Col } from "antd";
const { Option } = Select;
const PropertyFilterType = props => {
  return(
    <span>
      <Select
        key={props.propertyIndex}
        value={props.propertyFilterType}
        style={{ width: 70 }}
        onChange={e => {
          props.onEventItemConditionChangeHandler(
            e,
            "propertyFilterType",
            props.propertyIndex,
            props.elementIndex,
            props.conditionFor
          );
        }}
      >
        {props.propertyFilterTypes.map((val, ip) => {
          return (
            <Option key={ip} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
    </span>

  )
}
export default PropertyFilterType;
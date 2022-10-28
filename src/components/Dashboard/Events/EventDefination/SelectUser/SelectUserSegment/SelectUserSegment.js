import React, { Component } from "react";
import { Select, Row, Col } from "antd";
import Where from "../../../EventDefination/Where/Where";
import * as actionTypes from "../../../../../../store/actions/actionTypes";
import { connect } from "react-redux";
const { Option, OptGroup } = Select;

class SelectUserSegment extends Component {
  state = {};
  render() {
    function onSearch(val) {
      console.log("search:", val);
    }
    let conditionAvailable = this.props.segment.conditions.length > 0;
    let showCondition;
    let showConditionButton;
    if (conditionAvailable) {
      showCondition = (
        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            {this.props.segment.conditions.map((condition, propertyIndex) => {
              return (
                <Where
                  key={propertyIndex}
                  conditionFor="UserSegment"
                  conditionData={condition}
                  propertyIndex={propertyIndex}
                  elementIndex={this.props.segmentIndex}
                  propertyItems={this.props.segment.userProperties}
                />
              );
            })}
          </Col>
        </Row>
      );
    } else {
      showConditionButton = (
        <span>
          <button
            className="AddCondition"
            onClick={() =>
              this.props.onUserSegmentConditionAddHandler(
                this.props.segmentIndex
              )
            }
          >
            Where
          </button>
        </span>
      );
    }

    return (
      <div key={this.props.segmentIndex} className="SelectEvent">
        <Row>
          <Col span={18}>
            <Row>
              <Col span={24}>
                <span>
                  <p className="tryinbg">{this.props.segmentIndex}</p>
                  <Select
                    value={this.props.segment.segementName}
                    style={{ width: 150 }}
                    onChange={e => {
                      this.props.onUserSegmentChangeHandler(
                        e,
                        this.props.segmentIndex
                      );
                    }}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.props.allUserSegments.map((val, i) => {
                      return (
                        <Option key={i} value={val}>
                          {val}
                        </Option>
                      );
                    })}
                  </Select>
                </span>
                {showConditionButton}
              </Col>
            </Row>
            {showCondition}
          </Col>
          <Col span={6}>
            <button
              className="Delete"
              onClick={() =>
                this.props.onUserSegmentRemoveHandler(this.props.segmentIndex)
              }
            >
              Delete
            </button>
            <button
              className="Add"
              onClick={() => this.props.onUserSegmentAddHandler()}
            >
              Add
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserSegments: state.eventItem.UserSegments,
    allUserSegments: state.eventItem.allUserSegments
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUserSegmentAddHandler: () =>
      dispatch({ type: actionTypes.ADD_USER_SEGMENT }),
    onUserSegmentRemoveHandler: segmentIndex =>
      dispatch({
        type: actionTypes.REMOVE_USER_SEGMENT,
        segmentIndex: segmentIndex
      }),
    onUserSegmentChangeHandler: (value, segmentIndex) =>
      dispatch({
        type: actionTypes.UPDATE_USER_SEGMENT,
        value: value,
        segmentIndex: segmentIndex
      }),
    onUserSegmentConditionAddHandler: segmentIndex =>
      dispatch({
        type: actionTypes.ADD_CONDITION_USER_SEGMENT,
        segmentIndex: segmentIndex
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectUserSegment);

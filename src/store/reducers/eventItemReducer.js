import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";
import { stat } from "fs";

const initialState = {
  allAggregationType: ["Count", "Unique"],
  allPropertyFilterType: ["=", "!="],
  allUserSegments: ["All Users", "US Customers"],
  UserSegments: [
    // {
    //   segementName: "All Users",
    //   userProperties: ["Property1", "something"],
    //   conditions: []
    // },
    // {
    //   segementName: "All Users",
    //   userProperties: ["Property1", "something"],
    //   conditions: [
    //     {
    //       type: "where",
    //       propertyName: "something",
    //       propertyFilterType: "=",
    //       propertyRecordId: 14,
    //       propertyValue: "something"
    //     }
    //   ]
    // },
    // {
    //   segementName: "All Users",
    //   userProperties: ["Property1", "something"],
    //   conditions: [
    //     {
    //       type: "where",
    //       propertyName: "something",
    //       propertyFilterType: "=",
    //       propertyRecordId: 14,
    //       propertyValue: "something"
    //     }
    //   ]
    // },
    // {
    //   segementName: "All Users",
    //   userProperties: ["Property1", "something"],
    //   conditions: [
    //     {
    //       type: "where",
    //       propertyName: "something",
    //       propertyFilterType: "=",
    //       propertyRecordId: 14,
    //       propertyValue: "something"
    //     }
    //   ]
    // }
  ],
  EventItems: [
    {
      eventName: "Noor",
      eventId: 7,
      aggregationType: "Count",
      conditions: [
      
      ],
      groupBy: {propertyNames: ["path"]}
    }
  ],
  addConditions: false,
  addProperties: false
};

// Event Item starts
const removeEventItem = (state, index) => {
  const updatedArray = state.EventItems.filter((value, i) => {
    return i !== index;
  });
  return updateObject(state, { EventItems: updatedArray });
};

const updateEventItem = (state, value, index, options) => {
  const updatedArray = [...state.EventItems];
  updatedArray[index].eventId = options.name;
  updatedArray[index].eventName = options.value;
  return updateObject(state, { EventItems: updatedArray });
};

const updateWhereCondition = (
  entityType,
  state,
  value,
  propertyType,
  condition_index,
  eventItemIndex
) => {
  switch (entityType) {
    case "EventItem":
      const copyEventState = [...state.EventItems];
      const updatedArrayEvent = updateEventItemCondition(
        copyEventState,
        state,
        value,
        propertyType,
        condition_index,
        eventItemIndex
      );
      return updateObject(state, { EventItems: updatedArrayEvent });
    case "UserSegment":
      const copyUserState = [...state.UserSegments];
      const updatedArraySegment = updateEventItemCondition(
        copyUserState,
        state,
        value,
        propertyType,
        condition_index,
        eventItemIndex
      );
      return updateObject(state, { UserSegments: updatedArraySegment });
  }
};

const updateEventItemCondition = (
  copyState,
  state,
  value,
  propertyType,
  condition_index,
  eventItemIndex
) => {
  const updatedArray = copyState;
  switch (propertyType) {
    case "propertyName":
      updatedArray[eventItemIndex].conditions[
        condition_index
      ].propertyName = value;
      return updatedArray;
    case "propertyFilterType":
      updatedArray[eventItemIndex].conditions[
        condition_index
      ].propertyFilterType = value;
      return updatedArray;
    case "propertyValue":
      updatedArray[eventItemIndex].conditions[
        condition_index
      ].propertyValue = value;
      return updatedArray;
  }
};

const addEventItem = state => {
  var updatedArray = state.EventItems.concat({
    eventName: "Noor",
    aggregationType: "Count",
    conditions: []
  });
  return updateObject(state, { EventItems: updatedArray });
};

const removeEventItemCondition = (
  entityType,
  state,
  propertyIndex,
  eventItemIndex
) => {
  switch (entityType) {
    case "EventItem":
      const copyEventState = [...state.EventItems];
      const updatedArrayEvent = whereRemoveItem(
        copyEventState,
        state,
        propertyIndex,
        eventItemIndex
      );
      return updateObject(state, { EventItems: updatedArrayEvent });
    case "UserSegment":
      const copyUserState = [...state.UserSegments];
      const updatedArraySegment = whereRemoveItem(
        copyUserState,
        state,
        propertyIndex,
        eventItemIndex
      );
      return updateObject(state, { UserSegments: updatedArraySegment });
  }
};

const whereRemoveItem = (copyState, state, propertyIndex, eventItemIndex) => {
  const updatedArray = copyState;
  updatedArray[eventItemIndex].conditions.splice(propertyIndex, 1);
  return updatedArray;
};

const addEventItemCondition = (entityType, state, eventItemIndex) => {
  switch (entityType) {
    case "EventItem":
      const copyEventState = [...state.EventItems];
      const updatedArrayEvent = whereAddItem(
        copyEventState,
        state,
        eventItemIndex
      );
      return updateObject(state, { EventItems: updatedArrayEvent });
    case "UserSegment":
      const copyUserState = [...state.UserSegments];
      const updatedArraySegment = whereAddItem(
        copyUserState,
        state,
        eventItemIndex
      );
      return updateObject(state, { UserSegments: updatedArraySegment });
  }
};
const whereAddItem = (copyState, state, eventItemIndex) => {
  const updatedArray = copyState;
  updatedArray[eventItemIndex].conditions.push({
    type: "where",
    propertyName: null,
    propertyFilterType: "=",
    propertyValue: null
  });
  return updatedArray;
};
const updateEventItemAggregator = (state, value, eventItemIndex) => {
  const updatedArray = [...state.EventItems];
  updatedArray[eventItemIndex].aggregationType = value;
  return updateObject(state, { EventItems: updatedArray });
};
// Event Item Ends

// User Actions
const addUserSegment = state => {
  var updatedArray = state.UserSegments.concat({
    segementName: "All Users",
    conditions: []
  });
  return updateObject(state, { UserSegments: updatedArray });
};

const removeUserSegment = (state, index) => {
  const updatedArray = state.UserSegments.filter((value, i) => {
    return i !== index;
  });
  return updateObject(state, { UserSegments: updatedArray });
};

const updateUserSegment = (state, value, index) => {
  const updatedArray = [...state.UserSegments];
  updatedArray[index].segementName = value;
  return updateObject(state, { UserSegments: updatedArray });
};
const addCondtionUserSegment = (state, segmentIndex) => {
  const updatedArray = [...state.UserSegments];
  console.log("coming ehre");
  updatedArray[segmentIndex].conditions.push({
    type: "where",
    propertyName: null,
    propertyFilterType: null,
    propertyValue: null
  });
  return updateObject(state, { UserSegments: updatedArray });
};
// User Actions Ends

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.REMOVE_EVENT_ITEM:
      return removeEventItem(state, action.eventItemIndex);
    case actionType.UPDATE_EVENT_ITEM:
      console.log("printing data")
      console.log(action)
      return updateEventItem(state, action.value, action.eventItemIndex, action.options);
    case actionType.UPDATE_EVENT_ITEM_CONDITION:
      return updateWhereCondition(
        action.conditionFor,
        state,
        action.value,
        action.propertyType,
        action.condition_index,
        action.eventItemIndex
      );
    case actionType.ADD_EVENT_ITEM:
      return addEventItem(state);
    case actionType.REMOVE_EVENT_ITEM_CONDITION:
      return removeEventItemCondition(
        action.conditionFor,
        state,
        action.condition_index,
        action.eventItemIndex,
        action.conditionFor
      );
    case actionType.ADD_EVENT_ITEM_CONDITION:
      return addEventItemCondition(
        action.conditionFor,
        state,
        action.eventItemIndex
      );
    case actionType.UPDATE_EVENT_ITEM_AGGREGATOR:
      return updateEventItemAggregator(
        state,
        action.value,
        action.eventItemIndex
      );
    case actionType.ADD_USER_SEGMENT:
      return addUserSegment(state);
    case actionType.REMOVE_USER_SEGMENT:
      return removeUserSegment(state, action.segmentIndex);
    case actionType.UPDATE_USER_SEGMENT:
      return updateUserSegment(state, action.value, action.segmentIndex);
    case actionType.ADD_CONDITION_USER_SEGMENT:
      console.log("is it coming ehre");
      return addCondtionUserSegment(state, action.segmentIndex);
    default:
      return state;
  }
};

export default reducer;

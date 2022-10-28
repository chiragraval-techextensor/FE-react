import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query {
    userInfos {
      email
    }
  }  
`;

export const GET_ALL_EVENTS = gql`
query{
  getAllEvents {
    id
    name
  }
}`
;

export const GET_EVENT_PROPERTIES = gql`
query getEventProperty($id: ID!) {
  getEventProperty(id: $id)
}
`

export const GET_EVENT_PROPERTY_VALUES = gql`
query getEventPropertyValues($id: ID!, $eventProperty:String! ) {
  getEventPropertyValues(id:$id, eventProperty: $eventProperty)
}
`


export const GENERATE_GRAPH_DATA = gql`
query graphEventData($eventDataWithMeta: EventDataWithMeta) {
  graphEventData(eventDataWithMeta:$eventDataWithMeta){
    selectedDateRange {
      value
      groupBy
   }
   compareDateRange {
    value
    groupBy
   }
  }
}
`

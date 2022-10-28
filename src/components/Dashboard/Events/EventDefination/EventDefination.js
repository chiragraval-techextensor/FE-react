import React, { useState, useEffect, useRef } from 'react'
import { Select, Row, Col } from "antd";
import * as actionTypes from '../../../../store/actions/actionTypes'
import Layout from './../../../../components/Layout/Layout'
import ContentTab from '../../../../containers/ContentTab/ContentTab'
import SelectEvent from './../SelectEvent/SelectEvent'
import SelectUser from './SelectUser/SelectUser'
import LineCharts from '../../../Graph/LineCharts'
import { connect } from "react-redux";
import { useLazyQuery, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import * as eventsQuery from '../../../../queries/eventInfoQuery'
import * as gdata from '../../../../data/graph'
import './EventDefination.css'

const EventDefination = props => {
	const [ContentTabItems, setContentTabItems] = useState([{
		name: "Event",
		icon: "chart-bar"
	}, {
		name: "People",
		icon: "user"
	}]
	)
	function onClickRunQuery(e) {
		e.preventDefault();
		getGraphData({ variables: { eventDataWithMeta: eventDataWithMeta } });

	}
	const canvasRef = useRef();
	// console.log(canvasRef.current)
	useEffect(() => {
		console.log(canvasRef.current)
	}, [])


	const userData = {
		segment: {
			segmentId: 2,
			conditions: [{
				propertyFilterType: "=",
				propertyName: "initial_ip_address",
				propertyValue: "192.395.856.75"
			}]
		}
	}

	const selectedDateRange = {
		start: "2019-11-07",
		end: "2022-07-23"
	}
	const compareDateRange = {
		start: "2019-11-07",
		end: "2022-07-23"
	}

	const eventDataWithMeta = {
		eventData: props.eventItems,
		userData: userData,
		selectedDateRange: selectedDateRange,
		compareDateRange: compareDateRange
	}

	// const { loading, error, data } = useQuery(eventsQuery.GENERATE_GRAPH_DATA, {variables: {eventDataWithMeta: eventDataWithMeta}})
	const [dog, setDog] = useState(null);
	const [getGraphData, { loading, error, data }] = useLazyQuery(eventsQuery.GENERATE_GRAPH_DATA,
		{
			onCompleted: data => setDog(data)
		});

	if (loading) {
		return <Select value="Loading" />
	}
	else if (error){
		console.log("errorrrring" + error)
	}
	else if (dog) {
		new LineCharts(canvasRef.current, dog)
		console.log(dog)
		// console.log(data['graphEventData'])
	}

	return (
		<Layout className="EventDefination">
			{console.log("props.EventItems")}
			{console.log(props.eventItems)}
			<ContentTab tabs={ContentTabItems} />
			<div>
				<p className="EventText">EVENT FILTER  -  Find people who performed this events</p>

				<SelectEvent />

				<hr></hr>
				<p className="EventText">USER FILTER  -  Find people who performed this events</p>
				<SelectUser />
				<button className="query" onClick={(e) => onClickRunQuery(e)}>Run Query</button>
				<button className="query" onClick={() => props.onEventItemRemoveHandler(null, props.elementIndex)}>Try Query</button>
				{/* <div ref={ref}></div> */}
			</div>
			<div>
				<div ref={canvasRef} className="App"></div>
				{console.log("clicked on data button")}
				{console.log(dog)}
			</div>



		</Layout>
	)
}



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
		onEventItemRemoveHandler: (_) =>
			dispatch({})
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EventDefination);
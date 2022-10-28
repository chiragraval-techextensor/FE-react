import React, { Component } from 'react';
import LineCharts from './LineCharts';
import * as graphData from '../../../src/data/graph'

export default class ChartWrapper extends Component {
	componentDidMount() {
		new LineCharts(this.refs.chart, graphData.GRAPH_DATA)
	}
	// shouldComponentUpdate() {
	// 	return false
	// }

	// componentWillReceiveProps(nextProps) {
	// 	this.state.chart.update(nextProps.gender)
	// }
	
	render() {
		return <div ref="chart"></div>
	}
}
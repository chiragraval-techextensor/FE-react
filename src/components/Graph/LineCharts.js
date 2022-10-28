import * as d3 from 'd3';
import {timeFormat} from "d3-time-format";
import * as graphData from '../../../src/data/graph'
import { ConsoleWriter } from 'istanbul-lib-report';
var _ = require('lodash');

Array.prototype.groupBy = function (props) {
  var arr = this;
  var partialResult = {};
  
  arr.forEach(el=>{
  
      var grpObj = {};
      
      props.forEach(prop=>{
            grpObj[prop] = el[prop]
      });
      
      var key = JSON.stringify(grpObj);
      
      if(!partialResult[key]) partialResult[key] = [];
      
      partialResult[key].push(el);
      
  });
  
  var finalResult = Object.keys(partialResult).map(key=>{
     var keyObj = JSON.parse(key);
     keyObj.values = partialResult[key];
     return keyObj;
  })
  
  return finalResult;
}


function formatDate(date){
  var dateObj = new Date(date);
  var d3Format = d3.timeFormat("%Y-%m-%d");
  return new Date(d3Format(dateObj))
}

// var current_data_selected = data["graphEventData"]["selectedDateRange"][0]["value"]


function defaultData(selected_data, group, compared) {
  var data = selected_data.groupBy(group)
  var newData = []
  var g = group
  if (compared) {
    data.forEach(k => newData.push({key: `[Compared] ${g.map((p)=> k[p]).join("/")}`, v: k["values"].map(el => Object.assign({}, el, {performed_at: formatDate(el.performed_at)}))}))
  }
  else{
    data.forEach(k => newData.push({key: `${g.map((p)=> k[p]).join("/")}`, v: k["values"].map(el => Object.assign({}, el, {performed_at: formatDate(el.performed_at)}))}))
  }
  return newData
}

// var s  = defaultData(current_data_selected, ['path'], false)

var margin = {
  top: 30,
  right: 100,
  bottom: 30,
  left: 50
},
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

export default class LineCharts {
  constructor(element, data) {
    debugger;
    var current_data_selected = data["graphEventData"]["selectedDateRange"][0]["value"]
    var s  = defaultData(current_data_selected, ['path'], false)
    const svg = d3.select(element)
                .append('svg')
                .attr('width', width + margin.right + margin.left)
                .attr('height', height + margin.top + margin.bottom )
      var lines = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var performed_at_timelines = [].concat.apply([], s.map(k => k['v'].map(el => Object.assign({}, el, {performed_at: formatDate(el.performed_at)}))));
    var xScale = d3.scaleTime()
    .domain(d3.extent(performed_at_timelines.map(d => d.performed_at)))
    .range([0, 500]);

    var max = d3.max([].concat.apply([], s.map(k => k['v'].map(f => f.count))));
    var yScale = d3.scaleLinear()
            .domain([0, max])
            .range([height, 0]);

    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale);
    
    var myColor = d3.scaleOrdinal(d3.schemeCategory10)
                  .domain(s)

    const lineGen = d3
            .line()
            .x(d=> xScale(d.performed_at))
            .y(d=> yScale(d.count))
            .curve(d3.curveBundle);
    
    const chartGroup = lines.append('g').attr('class', 'line-chart')
    chartGroup.selectAll('.line-series')
    .data(s)
    .enter()
    .append('path')
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .attr('class', d => `line-series ${d.key}`)
    .attr('d', d => lineGen(d['v']))
    .style('stroke', d => myColor(d))
    
    

    // Add series label
    var charGroups = chartGroup
      .append('g')
      .attr('class', 'series-labels')
      .selectAll('.series-labels')
      .data(s)
      .enter()
      charGroups.append('rect')
      .attr('x', 20)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return (myColor(d));
      })
      charGroups.append('text')
      .attr('x', 50)
      .attr('y', function(d,i){return 10+ i*20}) 
      .text(d=>d.key)

      svg.append("g")
      .attr("class", "x axis")
      .attr('transform', `translate(${margin.left}, ${height+margin.bottom})`)
      .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)



      // var color = d3.scaleOrdinal(d3.schemeCategory10);
    // console.log(color)

    // var xAxis = d3.axisBottom(x).tickFormat(function(d){ return d.x;});
    // var yAxis = d3.axisLeft(y);
    // var line = d3.line().curve(d3.curveMonotoneX)
    //   .x(function(d) {
    //     return x(d.date);
    //   })
    //   .y(function(d) {
    //     return y(d.temperature);
    //   });
    // var svg = d3.select(element).append("svg")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // var data = d3.csvParse(myData)
    // color.domain(d3.keys(data[0]).filter(function(key) {
    //   return key !== "date";
    // }));

  //   data.forEach(function(d) {
      
  //     d.date = parseDate(d.date);
  //     console.log( d.date )
  //   });
  //   var cities = color.domain().map(function(name) {
  //     return {
  //       name: name,
  //       values: data.map(function(d) {
  //         return {
  //           date: d.date,
  //           temperature: +d[name]
  //         };
  //       })
  //     };
  //   });

  //   x.domain(d3.extent(data, function(d) {
  //     return d.date;
  //   }));
  //   y.domain([
  //     d3.min(cities, function(c) {
  //       return d3.min(c.values, function(v) {
  //         return v.temperature;
  //       });
  //     }),
  //     d3.max(cities, function(c) {
  //       return d3.max(c.values, function(v) {
  //         return v.temperature;
  //       });
  //     })
  //   ]);
  //   var legend = svg.selectAll('g')
  //     .data(cities)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'legend');
  //   legend.append('rect')
  //     .attr('x', width - 20)
  //     .attr('y', function(d, i) {
  //       return i * 20;
  //   }).attr('width', 10)
  //     .attr('height', 10)
  //     .style('fill', function(d) {
  //       return color(d.name);
  //     });
  //   legend.append('text')
  //     .attr('x', width - 8)
  //     .attr('y', function(d, i) {
  //       return (i * 20) + 9;
  //     })
  //     .text(function(d) {
  //       return d.name;
  //     });
  //   svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);
  //   svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis)
  //     .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", ".71em")
  //     .style("text-anchor", "end")
  //     .text("Temperature (ºF)");
  //   var city = svg.selectAll(".city")
  //     .data(cities)
  //     .enter().append("g")
  //     .attr("class", "city");
  //     city.append("path")
  //     .attr("class", "line")
  //     .attr("d", function(d) {
  //       return line(d.values);
  //     })
  //     .style("stroke", function(d) {
  //       return color(d.name);
  //     });
  //   var mouseG = svg.append("g")
  //     .attr("class", "mouse-over-effects");

  //   mouseG.append("path") // this is the black vertical line to follow mouse
  //     .attr("class", "mouse-line")
  //     .style("stroke", "black")
  //     .style("stroke-width", "1px")
  //     .style("opacity", "0");
    
  //   var lines = document.getElementsByClassName('line');
  //   var mousePerLine = mouseG.selectAll('.mouse-per-line')
  //   .data(cities)
  //   .enter()
  //   .append("g")
  //   .attr("class", "mouse-per-line");

  // mousePerLine.append("circle")
  //   .attr("r", 7)
  //   .style("stroke", function(d) {
  //     return color(d.name);
  //   })
  //   .style("fill", "none")
  //   .style("stroke-width", "1px")
  //   .style("opacity", "0");

  // mousePerLine.append("text")
  //   .attr("transform", "translate(10,3)");

  // mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
  //   .attr('width', width) // can't catch mouse events on a g element
  //   .attr('height', height)
  //   .attr('fill', 'none')
  //   .attr('pointer-events', 'all')
  //   .on('mouseout', function() { // on mouse out hide line, circles and text
  //     d3.select(".mouse-line")
  //       .style("opacity", "0");
  //     d3.selectAll(".mouse-per-line circle")
  //       .style("opacity", "0");
  //     d3.selectAll(".mouse-per-line text")
  //       .style("opacity", "0");
  //   })
  //   .on('mouseover', function() { // on mouse in show line, circles and text
  //     d3.select(".mouse-line")
  //       .style("opacity", "1");
  //     d3.selectAll(".mouse-per-line circle")
  //       .style("opacity", "1");
  //     d3.selectAll(".mouse-per-line text")
  //       .style("opacity", "1");
  //   })
  //   .on('mousemove', function() { // mouse moving over canvas
  //     var mouse = d3.mouse(this);
  //     d3.select(".mouse-line")
  //       .attr("d", function() {
  //         var d = "M" + mouse[0] + "," + height;
  //         d += " " + mouse[0] + "," + 0;
  //         return d;
  //       }); 
  //   })

  //   console.log(cities)
  //   console.log(data)
  //   console.log(color)
  }

  
}
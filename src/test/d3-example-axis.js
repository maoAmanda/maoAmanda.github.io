/**
 * 坐标系axis
 */

var width = 600;
var height = 600;
var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
// 获取x坐标轴的比例尺
var xscale = d3.scale.linear().domain([0, 10]).range([0, 300]);
// x坐标轴
var axis = d3.svg.axis().scale(xscale).orient("bottom");
var gAxis = svg.append("g").attr("transform", "translate(80,80)");
// 添加样式
// .axis path, .axis line {fill: none; stroke: black; shape-rendering: crispEdges;} 
// .axis text {font-family: sans-serif; font-size: 11px};
// 给坐标系添加样式
gAxis.attr("class", "axis");
gAxis.call(axis);

// demo：绘制一个散点图
var dotCenter = [
  [0.5, 0.5],
  [0.7, 0.8],
  [0.4, 0.9],
  [0.11, 0.32],
  [0.88, 0.25],
  [0.75, 0.12],
  [0.5, 0.1],
  [0.2, 0.3],
  [0.4, 0.1],
  [0.6, 0.7]
];
var xAxisWidth = 200;
var yAxisWidth = 200;
// x轴比例尺
var xScale = d3.scale.linear().domain([0, 1.2 * d3.max(center, function (d) {
  return d[0];
})]).range([0, xAxisWidth]);
// y轴比例尺
var yScale = d3.scale.linear().domain([0, 1.2 * d3.max(center, function (d) {
  return d[1];
})]).range([0, yAxisWidth]);
// 边框间距
var padding = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
var circle = d3.selectAll("circle")
  .data(center)
  .enter()
  .append("circle")
  .attr("fill", "black")
  .attr("cx", function (d) {
    return padding.left + xScale(d[0]);
  }).attr("cy", function (d) {
    return height - padding.bottom - yScale(d[1]);
  }).attr("r", 5);
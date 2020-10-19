/**
 * 折线图
 */
var dataset = [{
  country: "china",
  gbp: [
    [2000, 11920],
    [2001, 13170],
    [2002, 14550],
    [2003, 16500],
    [2004, 19440],
    [2005, 22870],
    [2006, 27930],
    [2007, 35040],
    [2008, 45470],
    [2009, 51050],
    [2010, 59490],
    [2011, 73140],
    [2012, 83860],
    [2013, 103550]
  ]
}, {
  country: "japan",
  gbp: [
    [2000, 47310],
    [2001, 41590],
    [2002, 39800],
    [2003, 43020],
    [2004, 46550],
    [2005, 45710],
    [2006, 43560],
    [2007, 43560],
    [2008, 48490],
    [2009, 50350],
    [2010, 54950],
    [2011, 59050],
    [2012, 59370],
    [2013, 48980]
  ]
}];
var colors = [d3.rgb(0, 0, 255), d3.rgb(0.255, 0)];
var padding = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
// x轴比例尺
var xScale = d3.scale.linear()
  .domain([2000, 2013])
  .range([0, width - padding.left - padding.right]);
// y轴比例尺
var yScale = d3.scale.linear()
  .domain([0, gdpMax * 1.11])
  .range([height - padding.top - padding.bottom, 0]);

var linePath = d3.svg.line()
  .interpolate("cardinal") // 插值模式，让线段看起来有点弧度,不会那么生硬
  .x(function (d) {
    return xScale(d[0]);
  })
  .y(function (d) {
    return yScale(d[1]);
  });
svg.selectAll("path")
  .data(dataset)
  .enter()
  .append("path")
  .attr("trandform", "translate(" + padding.left + "," + padding.top + ")")
  .attr("d", function (d) {
    return linePath(d.gdp);
  })
  .attr("fill", "none")
  .attr("stroke-width", 3)
  .attr("stroke", function (d, i) {
    return colors[i];
  });
// 添加坐标轴
var xAxis = d3.svg.axis()
  .scale(xScale)
  .ticks(5)
  .tickFormat(d3.format("d"))
  .orient("bottom");
var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
  .call(xAxis);
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
  .call(yAxis);
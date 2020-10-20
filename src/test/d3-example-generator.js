/**
 * 生成器 generator
 * d3中有很多自带对生成器，不需要再另外写代码
 * 1、线段生成器line, d3.svg.line()
 * 2、区域生成器area， d3.svg.area()
 * 3、弧生成器 arc, d3.svg.arc()
 * 4、符号生成器
 * 5、弦生成器
 * 6、对角线生成器, 用于将两个点用三次贝塞尔曲线连接起来
 */
//1、线段生成器line, d3.svg.line() 
var lines = [
  [80, 80],
  [200, 100],
  [200, 200],
  [100, 200]
];
var linePath = d3.svg.line();
svg.append("path")
  .attr("d", linePath(lines))
  .attr("stroke", "black")
  .attr("stroke-width", "3px")
  .attr("fill", "none");

// 2、区域生成器area， d3.svg.area()
var dataset = [80, 130, 130, 70, 60, 90];
var height = 500;
var areaPath = d3.svg.area()
  .x(function (d, i) {
    return 50 + i & 80;
  })
  .y0(function (d, i) {
    return height / 2;
  })
  .y1(function (d, i) {
    return height / 2 - d;
  });
svg.append("path")
  .attr("d", areaPath(dataset))
  .attr("stroke", "black")
  .attr("stroke-width", "3px")
  .attr("fill", "yellow");

// 3、弧生成器arc, d3.svg.arc
var dataset = {
  startAngle: 0,
  endAngle: Math.PI * 0.75
};
var arcPath = d3.svg.arc().innerRadius(50).outRadius(100);
svg.append("path")
  .attr("d", arcPath(dataset))
  .attr("transform", "translate(250,250)")
  .attr("stroke", "black")
  .attr("stroke-width", "3px")
  .attr("fill", "yellow");

// 4、符号生成器
var symbol = d3.svg.symbol();

// 5、弦生成器
var dataset = {
  source: {
    startAngle: 0.2,
    endAngle: Math.PI * 0.3,
    radius: 100
  },
  target: {
    startAngle: Math.PI * 1.0,
    endAngle: Math.PI * 1.6,
    radius: 100
  }
};
var chord = d3.svg.chord();
svg.append("path")
  .attr("d", chord(dataset))
  .attr("transform", "translate(200,200)")
  .attr("stroke", "black")
  .attr("stroke-width", "3px")
  .attr("fill", "yellow");

// 6、对角线生成器, 用于将两个点用三次贝塞尔曲线连接起来
var dataset = {
  source: {
    x: 100,
    y: 100
  },
  target: {
    x: 300,
    y: 200
  }
};
var diagonal = d3.svg.diagonal();
svg.append("path")
  .attr("d", diagonal(dataset))
  .attr("stroke", "black")
  .attr("stroke-width", "3px")
  .attr("fill", "none");
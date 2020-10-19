/**
 * 柱状图
 */
var dataset = [50, 43, 120, 87, 99, 167, 142];
// 插入一个宽高均为400的一块svg画布
var width = 400;
var height = 400;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var padding = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
var rectStep = 35;
var rectWidth = 30;
// 绘制柱状图
var rect = svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("fill", "steelblue")
  .attr("x", function (d, i) {
    return padding.left + i * rectStep;
  })
  .attr("y", function (d, i) {
    return height - padding.bottom - d;
  })
  .attr("width", rectWidth)
  .attr("height", function (d) {
    return d;
  });
// 显示文字在每个柱子上面
var text = d3.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .attr("fill", "white")
  .attr("font-size", "14px")
  .attr("text-anchor", "middle")
  .attr("x", function (d, i) {
    return padding.left + i * rectStep;
  })
  .attr("y", function (d) {
    return height - padding.bottom - d;
  })
  .attr("dx", rectWidth / 2)
  .attr("dy", "1em")
  .text(function (d) {
    return d;
  });
// 数据改变重绘 ,添加或者排序都可以
function draw() {
  var updateRect = svg.selectAll("rect").data(dataset);
  var enterRect = updateRect.enter();
  var exitRect = updateRect.exit();

  updateRect.attr("fill", "steelblue")
    .attr("x", function (d, i) {
      return padding.left + i * rectStep;
    })
    .attr("y", function (d) {
      height - padding.bottom - d;
    })
    .attr("width", rectWidth)
    .attr("height", function (d) {
      return d;
    });

  enterRect.append("rect")
    .attr("fill", "steelblue")
    .attr("x", function (d, i) {
      return padding.left + i * rectStep;
    })
    .attr("y", function (d) {
      height - padding.bottom - d;
    })
    .attr("width", rectWidth)
    .attr("height", function (d) {
      return d;
    });

  exitRect.remove();
}
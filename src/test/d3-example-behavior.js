/**
 * 用户行为 behavior
 *  鼠标事件 click,mouseover,mouseout...
 *  键盘事件 keydown,keypress...
 *  触屏事件 touchstart,touchmove,touchend
 *  拖拽 d3.behavior.drag() => dragstart, drag, dragend
 *  缩放 d3.behavior.zoom()
 */
// 缩放举例
var circles = [{
  cx: 150,
  cy: 200,
  r: 30
}, {
  cx: 220,
  cy: 200,
  r: 30
}, {
  cx: 150,
  cy: 270,
  r: 30
}, {
  cx: 220,
  cy: 270,
  r: 30
}];
var zoom = d3.behabior.zoom()
  .scaleExtent([1, 10])
  .on("zoom", function (d) {
    d3.select(this)
      .attr("transform", "translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");
  });
var g = svg.append("g")
  .call(zoom);
g.selectAll("circle")
  .data(circles)
  .enter()
append("circle")
  .attr("cx", function (d) {
    return d.cx;
  })
  .attr("cy", function (d) {
    return d.cy;
  })
  .attr("r", function (d) {
    return d.r;
  })
  .attr("fill", "black");
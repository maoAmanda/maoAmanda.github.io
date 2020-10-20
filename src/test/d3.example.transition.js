/**
 * 过渡效果transition
 * 使用方式：selection.transititon / d3.transtion 
 * 获取子组件：
 *  select()
 *  selectAll()
 *  filter()
 *  each([type,]listener) // start ,end, interrupt 监听过渡事件
 * api: 
 *  延迟 delay()  
 *  持续时间 duration()
 *  过渡样式 ease(type) type:linear,cubic,elastic,back,bounce,也可以是和in，out搭配使用，linear-in,linear-out。。。
 * 属性：
 *  attr(key, value) 定义属性过渡值
 *  attrTween(key, function) 定义属性具体怎样过渡
 *  text(value) 设定值
 *  tween(key, function) 设定过渡效果
 *  remove() 过渡结束删除
 */
// html
/**
 * <body>
 *  <button type="button" onclick="update()">更新</button>
 *  < button type = "button" onclick = "update()">增加</button>
 *  < button type = "button" onclick = "update()">删除</button>
 * < /body>
 */
// 散点图举例
var center = [
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
var width = 500;
var height = 500;
var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
var padding = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var xAxisWidth = 300;
var yAxisWidth = 300;
var xScale = d3.scale.liner().domain([0, 1]).range([0, xAxisWidth]);
var yScale = d3.scale.liner().domain([0, 1]).range([0, yAxisWidth]);

function drawCircle() {
  var circleUpdate = svg.selectAll("circle")
    .data(center);
  var circleEnter = circleUpdate.enter();
  var circleExit = circleUpdate.exit();
  // 添加过渡，移动到坐标位置
  circleUpdate
    .transition()
    .duration(500)
    .attr("cx", function (d) {
      return padding.left + xScale(d[0]);
    })
    .attr("cy", function (d) {
      return height - padding.bottom - yScale(d[1]);
    });

  circleEnter.append("circle")
    .attr("fill", "black")
    .attr("cx", padding.left)
    .attr("cy", height - padding.bottom)
    .attr("r", 7)
    .transition()
    .duration(500)
    .attr("cx", function (d) {
      return padding.left + xScale(d[0]);
    })
    .attr("cy", function (d) {
      return height - padding.bottom - yScale(d[1]);
    });
  circleExit.transition().duration(500).attr("fill", "white").remove();
}

function drawAxis() {
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(5);
  yScale.range([yAxisWidth, 0]);
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom - yAxisWidth) + ")")
    .call(yAxis);
  // 绘制完将值域变回去
  yScale.range([0, yAxisWidth]);
}

// 更新
function update() {
  for (var i = 0; i < center.length; i++) {
    center[i][0] = Math.random();
    center[i][1] = Math.random();
  }
  drawCircle();
}
// 添加
function add() {
  center.push([Math.random(), Math.random()]);
  drawCircle();
}
// 删除
function sub() {
  center.pop();
  drawCircle();
}
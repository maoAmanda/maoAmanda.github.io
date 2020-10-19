// d3当中有多种比例尺，特点和用法简单总结
/*
1、 线性比例尺 d3.scale.linear(), 定义域domain是连续的，值域range是连续的
2、 指数比例尺 d3.scale.pow().exponent(3), 定义域domain是连续的，值域range是连续的
3、 对数比例尺 d3.scale.log().base(n), 定义域domain是连续的，值域range是连续的
4、 量子比例尺 d3.scale.quantize(), 定义域domain是连续的，值域range是离散的,分段值与起始值和结束值有关
5、 分位比例尺 d3.scale.quantile(), 定义域domain是连续的，值域range是离散的, 分段值与定义域中的值都有关
6、 阈值比例尺 d3.scale.threshold(), 定义域domain是连续的，值域range是离散的
7、 序数比例尺 d3.scale.ordinal(), 定义域domain是连续的，值域range可以是离散也可以是连续
**/

// 举例子：

var linear = d3.scale.linear().domain([0, 20]).range([0, 100]);
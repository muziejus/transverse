let thePath = location.pathname.replace("index.html", "");
if ( thePath === "/" ){
  thePath = "";
}
$("#bibliography").nextAll("ul").addClass("bibliography");
$("p").filter( function() {
  return (this.textContent || this.innerText).match(/^-->/);
}) .addClass("credit").html(function(i, html){
  return html.replace(/^--&gt; /, "");
});

const margin = {top: 20, right: 20, bottom: 40, left: 50},
  svgWidth = $("svg#lot49-raw-diff").width(),
  svgHeight = .75 * $(window).height(), 
  width = +svgWidth - margin.left - margin.right,
  height = +svgHeight - margin.top - margin.bottom;

horizBar("lot49-real-fake-la-sf-bar", "lot49-real-fake", "Number of distinct places");
horizBar("lot49-real-fake-la-sf-bar-instance", "lot49-real-fake-instance", "Total times a place is mentioned");
lineGraph("lot49-raw-diff", "diff", "Total difference between “real” and “fake” place mentions", [0, 164])
lineGraph("lot49-diff-norm", "diffN", "Norm. diff. btwn “real” (positive) and “fake” place mentions", [-0.25, 0.15])

const x = d3.scaleLinear().rangeRound([0, width]);
const y = d3.scaleLinear().rangeRound([height, 0]);
x.domain([9, 183]);
y.domain([-0.25, 0.15]);
d3.select("#lot49-diff-norm-g")
  .append("line")
    .attr("x1", x(9))
    .attr("y1", y(0))
    .attr("x2", x(183))
    .attr("y2", y(0))
    .attr("stroke", "#839496");


function horizBar(svgId, csvFile, xLegend) {
  $("svg#" + svgId).attr("width", svgWidth);
  $("svg#" + svgId).attr("height", svgHeight);
  const svg = d3.select("#" + svgId),
    g = svg.append("g").attr("transform", "translate(" + 60 + "," + margin.top + ")");

  const x = d3.scaleLinear().rangeRound([0, width - 20]);
  const y = d3.scaleBand().rangeRound([0, height])
    .paddingInner(0.05).align(0.1);
  const z = d3.scaleOrdinal()
    .range(["#b58900", "#268bd2", "#dc322f"]);

  d3.csv(thePath + "/moacir-files/" + csvFile + ".csv", function(d, i, col){
    for (i = 1, t=0; i < col.length; ++i) t += d[col[i]] = +d[col[i]];
    d.total = t;
    return d;
  }, function(error, data){
    if (error) throw error;

    const keys = data.columns.slice(1);

    data.sort(function(a, b) { return b.total - a.total; });
    y.domain(data.map(function(d) { return d.key; }));
    x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
    z.domain(keys);

    g.append("g")
      .selectAll("g")
      .data(d3.stack().keys(keys)(data))
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("y", function(d) { return y(d.data.key); })
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height", y.bandwidth());

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(y));

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,"+height+")")
      .call(d3.axisBottom(x).ticks(null, "s"))
    .append("text")
      .attr("fill", "#839496")
      .attr("y", -12)
      .attr("x", width - 10)
      .attr("text-anchor", "end")
      .text(xLegend);

  var legend = g.append("g")
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice())
    .enter().append("g")
    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
   .attr("transform", function(d, i) { return "translate(-30," + (300 + i * 20) + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);
  legend.append("text")
        .attr("x", width - 24)
        .attr("class", "gray-text")
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
  });
}

function lineGraph(svgId, dataCol, yLegend, yDomain) {
  $("svg#" + svgId).attr("width", svgWidth);
  $("svg#" + svgId).attr("height", svgHeight);
  const svg = d3.select("#" + svgId),
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("id", svgId + "-g");
  const x = d3.scaleLinear().rangeRound([0, width]);
  const y = d3.scaleLinear().rangeRound([height, 0]);
  const line = d3.line().x(function(d) { 
    return x(d.page); 
  }).y(function(d) { 
    return y(d[dataCol]); 
  });
  d3.tsv(thePath + "/moacir-files/lot49-data.tsv", function(d) {
    return d;
  }, function(error, data) {
    if (error) throw error;
    // x.domain(d3.extent(data, function(d) { return d.page; }));
    // y.domain(d3.extent(data, function(d) { return d.diff; }));
    x.domain([9, 183]);
    y.domain(yDomain);
    g.append("g")
        .attr("id", svgId + "-xaxis")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis")
        .attr("fill", "#839496")
        // .call(d3.axisBottom(x))
        .call(d3.axisBottom(x))
      .append("text")
        .attr("fill", "#839496")
        .attr("y", 22)
        .attr("x", 0)
        .attr("text-anchor", "center")
        .text("9");

    d3.selectAll("#" + svgId + "-xaxis")
      .append("text")
        .attr("fill", "#839496")
        .attr("y", -12)
        .attr("x", width)
        .attr("text-anchor", "end")
        .text("page");

    g.append("g")
        .attr("class", "axis")
        .attr("fill", "#fff")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#839496")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(yLegend);

    g.append("path")
        .datum(data)
        .attr("class", "yellow-line")
        .attr("d", line);
  });
}

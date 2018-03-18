$("#bibliography").nextAll("ul").addClass("bibliography");

const svgWidth = .75 * $(window).width(); 
const svgHeight = .75 * $(window).height(); 
$("svg#lot49-raw-diff").attr("width", svgWidth);
$("svg#lot49-raw-diff").attr("height", svgHeight);

  const svg = d3.select("#lot49-raw-diff"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  const x = d3.scaleLinear()
    .rangeRound([0, width]);
  const y = d3.scaleLinear()
    .rangeRound([height, 0]);
  const line = d3.line()
    .x(function(d) { return x(d.page); })
    .y(function(d) { return y(d.diff); });

  d3.tsv("/moacir-files/lot49-data.tsv", function(d) {
    return d;
  }, function(error, data) {
    if (error) throw error;

    // x.domain(d3.extent(data, function(d) { return d.page; }));
    // y.domain(d3.extent(data, function(d) { return d.diff; }));
    x.domain([9, 200]);
    y.domain([0, 164]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#fff")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("y-axis");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
  });

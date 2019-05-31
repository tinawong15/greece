var margin = {top: 100, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right // Use the window's width
  , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

  // 5. X scale will use the index of our data
  var xScale = d3.scaleLinear()
      .domain([2009, 2019]) // input
      .range([0, width]); // output

var yScale = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]); // output

    var priceline = d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.value); })
        .curve(d3.curveMonotoneX);
var svg = d3.select("#line_graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// show tooltip when mouse over dot
var mouseover = function(d,i) {

    tooltip.transition()
                .duration(300)
                .style("opacity", .9);
    tooltip.html( d.name + " : (" + d[activex] + "," + d[activey] + ")" )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 30) + "px");

};

// set opacity of tooltip to 0 when mouse not over dot
var mouseleave = function(d,i) {
    tooltip
	.transition()
	.duration(300)
	.style("opacity", 0)

}
d3.csv("https://raw.githubusercontent.com/tinawong15/greece/master/stats.csv", function(error,data) {
  //console.log(data)
  Array(data).forEach(function(d) {
    d.year = +d.year
    d.value = +d.value

  })

  xScale.domain(d3.extent(data, function(d) { return d.year; }));
   yScale.domain([0, d3.max(data, function(d) { return d.value; })]);


  var dataNest = d3.nest()
    .key(function(d) {return d.type;})
    .entries(data);


  var color = d3.scaleOrdinal(d3.schemeCategory10);

    legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) {

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign an ID
            .attr("d", priceline(d.values));

        // Add the Legend
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1;
                // Hide or show the elements based on the ID
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100)
                    .style("opacity", newOpacity);
                // Update whether or not the elements are active
                d.active = active;
                })
            .text(d.key);


            // 12. Appends a circle for each datapoint
            svg.selectAll(".dot")
                .data(dataset)
              .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", function(d, i) { return xScale(i) })
                .attr("cy", function(d) { return yScale(d.y) })
                .attr("r", 5)
                  .on("mouseover", function(a, b, c) {
              			console.log(a)
                    this.attr('class', 'focus')
            		})
                  .on("mouseout", function() {  })
            //       .on("mousemove", mousemove);


})

svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));

 // Add the Y Axis
 svg.append("g")
     .attr("class", "axis")
     .call(d3.axisLeft(yScale));

});

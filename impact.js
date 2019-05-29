var yearRange = [2009, 2019]
var voteRange = [0, 50]

var inRange = function (n, range){
    return range[1] >= n && n >= range[0]
}

var draw = function() {
  var center, countries, height, path, projection, scale, svg, width;
  width = 800;
  height = 800;
  center = [30, 70];
  scale = 400;
  projection = d3.geoMercator()
                  .scale(scale)
                  .translate([width / 2, 0])
                  .center(center);
  path = d3.geoPath()
                  .projection(projection);
  svg = d3.select("#map").append("svg")
                  .attr("height", height)
                  .attr("width", width);
  countries = svg.append("g");

  d3.json("https://gist.githubusercontent.com/milafrerichs/69035da4707ea51886eb/raw/4cb1783c2904f52cbb8a258ee96031f9054d155b/eu.topojson", function(data) {
    var country = countries.selectAll('.country')
      .data(topojson.feature(data, data.objects.europe).features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
      .style('fill', 'white')
      .style('stroke', 'black');
    //return;


  var color = d3.scaleLinear()
              .domain(voteRange)
              .range(['ffffff', '#ff0000']);

  function update(year){
      slider.property("value", year);
      d3.select(".year").text(year);
      country.style("fill", function(d) {
        return color(countrystats.votes[year])
  });
  }

    var slider = d3
            .select('#mySlider')
            //.attr("type", "range")
            //.attr("min", yearRange[0])
      			//.attr("max", yearRange[1])
      			.attr("step", 1)
            .on("input", function() {
              var year = this.value;
              update(year)
            })

    slider.append('text')
         .attr("y", -10)
         .text("Filter by year")
         .style('font-family', 'sans-serif');
  });
};
draw();

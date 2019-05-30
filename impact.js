var polls =
{ "Greece": {
  "party": "Golden Dawn",
  "leader": "Nikolaos Michaloliakos",
  "votes": {
    "2009": 0.5,
    "2010": 5.3,
    "2011": 5.3,
    "2012": 7,
    "2013": 7,
    "2014": 9.3,
    "2015": 6.3,
    "2016": 6.3,
    "2017": 6.3,
    "2018": 6.3,
    "2019": 7
  }
},
"Sweden": {
  "party": "Sweden Democrats",
  "leader": "",
  "votes": {
    "2009": 5.7,
    "2010": 5.7,
    "2011": 5.7,
    "2012": 5.7,
    "2013": 5.7,
    "2014": 12.9,
    "2015": 12.9,
    "2016": 12.9,
    "2017": 12.9,
    "2018": 17.5,
    "2019": 17.6
  }

  } ,
  "France": {
    "party": "National Rally",
    "leader": "Marine Le Pen",
    "votes": {
      "2009": 6.3,
      "2010": 11.4,
      "2011": 11.4,
      "2012": 17.9,
      "2013": 17.9,
      "2014": 24.9,
      "2015": 27.7,
      "2016": 27.7,
      "2017": 21.3,
      "2018": 21.3,
      "2019": 21.3

    }

    } ,
    "Netherlands": {
      "party": "Party for Freedom",
      "leader": "Geert Wilder",
      "votes": {
        "2009": 16.97,
        "2010": 15.5,
        "2011": 12.74,
        "2012": 10.1,
        "2013": 10.1,
        "2014": 13.32,
        "2015": 11.58,
        "2016": 11.58,
        "2017": 13.1,
        "2018": 13.1,
        "2019": 13.1

      }

      } ,
      "Finland": {
        "party": "The Finns",
        "leader": "",
        "votes": {
          "2009": 0,
          "2010": 0,
          "2011": 19.05,
          "2012": 0,
          "2013": 0,
          "2014": 12.87,
          "2015": 17.65,
          "2016": 0,
          "2017": 0,
          "2018": 0,
          "2019": 17.7

        }

        } ,
        "Denmark": {
          "party": "Danish People's Party",
          "leader": "",
          "votes": {
            "2009": 15.3,
            "2010": 0,
            "2011": 12.3,
            "2012": 0,
            "2013": 0,
            "2014": 26.6,
            "2015": 21.1,
            "2016": 0,
            "2017": 0,
            "2018": 21,
            "2019": 10.8

          }

          } ,
          "Germany": {
            "party": "Alternative for Germany",
            "leader": "",
            "votes": {
              "2009": 0,
              "2010": 0,
              "2011": 0,
              "2012": 0,
              "2013": 4.7,
              "2014": 7.1,
              "2015": 7.1,
              "2016": 7.1,
              "2017": 12.6,
              "2018": 12.6,
              "2019": 11

            }

            } ,
            "Hungary":{
              "party": "Fidesz",
              "leader": "",
              "votes": {
                "2009": 56.36,
                "2010": 52.73,
                "2011": 0,
                "2012": 0,
                "2013": 0,
                "2014": 44.87,
                "2015": 0,
                "2016": 0,
                "2017": 0,
                "2018": 49.27,
                "2019": 52

              }

              } ,
              "Switzerland":{
                "party": "Swiss People's Party",
                "leader": "",
                "votes": {
                  "2009": 0,
                  "2010": 0,
                  "2011": 26.6,
                  "2012": 0,
                  "2013": 0,
                  "2014": 0,
                  "2015": 29.4,
                  "2016": 0,
                  "2017": 0,
                  "2018": 0,
                  "2019": 29

                }

                } ,
                "Austria":{
                  "party": "Freedom Party",
                  "leader": "",
                  "votes": {
                    "2009": 12.7,
                    "2010": 0,
                    "2011": 0,
                    "2012": 0,
                    "2013": 20.5,
                    "2014": 19.7,
                    "2015": 0,
                    "2016": 0,
                    "2017": 26,
                    "2018": 0,
                    "2019": 26

                  }

                  } ,
                  "Spain":{
                    "party": "Vox",
                    "leader": "",
                    "votes": {
                      "2009": 0,
                      "2010": 0,
                      "2011": 0,
                      "2012": 0,
                      "2013": 0,
                      "2014": 0,
                      "2015": 0.2,
                      "2016": 0.2,
                      "2017": 0.2,
                      "2018": 0.2,
                      "2019": 10.3

                    }

                  }
                }

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

   var update = function(year){
       slider.property("value", year);
       d3.select(".year").text(year);
       var country = svg.selectAll(".country")
          .style("fill", function(d) {
            console.log((d.properties.name))
            console.log(polls[d.properties.name])
            if (!polls[d.properties.name]){
              return color(0)
            }
            else{

             return color(polls[d.properties.name]["votes"][year])
           }
           });



         }
  });
};


draw();

/*
   This module is based on the wonderful tutorial by Eric S. Bullington at
   https://www.ericbullington.com/blog/2012/10/27/d3-oclock/
*/

/* Get the current time and place into a D3 friendly data structure */
var fields = function() {
  var currentTime, hour, minute, second;
  currentTime = new Date()
  second = currentTime.getSeconds()
  minute = currentTime.getMinutes() // +seconds / 20 for smooth sweep second hand
  hour = currentTime.getHours() + minute / 60
  return data = [
    { "unit": "seconds", "numeric": second },
    { "unit": "minutes", "numeric": minute },
    { "unit": "hours",    "numeric": hour }
  ]
}

/* Define the SVG box, placement of clock,
   and prepare scaling functions for the hands
*/
var width, height, offSetX, offSetY, pi, scaleSecs, scaleHours;
width = 200;
height = 200;
offSetX = 100;
offSetY = 100;

pi = Math.PI;
scaleSecs = d3.scaleLinear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
scaleMins = d3.scaleLinear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
scaleHours = d3.scaleLinear().domain([0, 11 + 59/60]).range([0, 2 * pi]);

/* Initialize SVG canvas and draw static portions of clock */
var vis, clockGroup;

vis = d3.selectAll(".clock")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);

clockGroup = vis.append("svg:g")
  .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

clockGroup.append("svg:circle")
  .attr("r", 80).attr("fill", "none")
  .attr("class", "clock outercircle")
  .attr("stroke", "black")
  .attr("stroke-width", 2);

clockGroup.append("svg:circle")
  .attr("r", 4)
  .attr("fill", "black")
  .attr("class", "clock innercircle");

/* Renderer takes a time data parameter and binds it to the hands of the clock */
var render = function(data) {

  var hourArc, minuteArc, secondArc;

  clockGroup.selectAll(".clockhand").remove();

  secondArc = d3.arc()
    .innerRadius(0)
    .outerRadius(70)
    .startAngle(function(d) {
    return scaleSecs(d.numeric);
  })
    .endAngle(function(d) {
    return scaleSecs(d.numeric);
  });

  minuteArc = d3.arc()
    .innerRadius(0)
    .outerRadius(70)
    .startAngle(function(d) {
    return scaleMins(d.numeric);
  })
    .endAngle(function(d) {
    return scaleMins(d.numeric);
  });

  hourArc = d3.arc()
    .innerRadius(0)
    .outerRadius(50)
    .startAngle(function(d) {
    return scaleHours(d.numeric % 12);
  })
    .endAngle(function(d) {
    return scaleHours(d.numeric % 12);
  });

  clockGroup.selectAll(".clockhand")
    .data(data)
    .enter()
    .append("svg:path")
    .attr("d", function(d) {
      if (d.unit === "seconds") {
        return secondArc(d);
      } else if (d.unit === "minutes") {
        return minuteArc(d);
      } else if (d.unit === "hours") {
        return hourArc(d);
      }
    })
    .attr("class", "clockhand")
    .attr("stroke", "black")
    .attr("stroke-width", function(d) {
      if (d.unit === "seconds") {
        return 2;
      } else if (d.unit === "minutes") {
        return 3;
      } else if (d.unit === "hours") {
        return 3;
      }
    })
    .attr("fill", "none");
};

setInterval(function() {
  var data;
  data = fields();
  return render(data);
}, 1000);

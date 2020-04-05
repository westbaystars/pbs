/*
   This module is based on the wonderful tutorial by Eric S. Bullington at
   https://www.ericbullington.com/blog/2012/10/27/d3-oclock/
*/

const pi = Math.PI;     // Convience variable for PI

// Functions for scaling clock hands
const scaleSecs = d3.scaleLinear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
const scaleMins = d3.scaleLinear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
const scaleHours = d3.scaleLinear().domain([0, 11 + 59/60]).range([0, 2 * pi]);
const labelScale = d3.scaleLinear().domain([0,60,5]).range([0, 360]);

/* Create an analog clock
   @container is a d3 selection of the parent node
   @width is the display width and height
*/
function aClockCreate(container, width) {
  var svg = container.append("svg")
    .attr("width", width)
    .attr("height", width)
    .attr("viewBox", "0 0 200 200") // Inernal coordinate system
    .attr("class", "analog-clock");

  var clockGroup = svg.append("g")
    .attr("class", "clock-group")
    .attr("transform", "translate(100,100)");

  // Outer circle
  clockGroup.append("circle")
    .attr("r", 95).attr("fill", "none")
    .attr("class", "clock outercircle")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  // Hour labels
  for (var hour = 1; hour <= 12; ++hour) {
    clockGroup.append("g")
      .attr("transform", "rotate(" + (hour % 12 * 30) + ")")
      .append("text")
        .text(String.fromCodePoint(8544 + hour -1))  // UTF-8 8544 is Roman Number 1
        .attr("text-anchor", "middle")
        .attr("font-family", "serif")
        .attr("font-size", 14)
        .attr("x", 0)
        .attr("y", 6)
        .attr("dy", -85)
        .attr("fill", "black")
        .attr("transform", "rotate("+ -(hour % 12 * 30) + ",0,-85)");
  }

  // Central circle
  clockGroup.append("circle")
    .attr("r", 4)
    .attr("fill", "black")
    .attr("class", "clock innercircle");

  svg.selectAll('g.clock-group')
    .call(aClockDrawHands);
}

// Draw hands of an analog clock
//   @clock is the component that contains a data structure with a time property
//     which is an array of three units (hours, minutes, seconds) with assoiated
//     numbers. Will not display any hands that are not included.
function aClockDrawHands(clock) {
  // D3.v5 is not working as documented. There is no index variable passed
  // to each(d, i) and "this" is not the current element.
  // Manually tracking the index and current node as a work around.
  var i=0;
  clock.each(data => {
    var group = d3.select(clock.nodes()[i])
    // Clear drawHands
    group.selectAll(".clock-hand").remove();

    secondArc = d3.arc()
      .innerRadius(0)
      .outerRadius(70)
      .startAngle(d => scaleSecs(d.number))
      .endAngle(d => scaleSecs(d.number));

    minuteArc = d3.arc()
      .innerRadius(0)
      .outerRadius(70)
      .startAngle(d => scaleMins(d.number))
      .endAngle(d => scaleMins(d.number));

    hourArc = d3.arc()
      .innerRadius(0)
      .outerRadius(50)
      .startAngle(d => scaleHours(d.number % 12))
      .endAngle(d => scaleHours(d.number % 12));

    group.selectAll(".clock-hand")
      .data(data.time)
      .enter()
      .append("path")
      .attr("d", d => {
        if (d.units === "seconds") {
          return secondArc(d);
        } else if (d.units === "minutes") {
          return minuteArc(d);
        } else if (d.units === "hours") {
          return hourArc(d);
        }
      })
      .attr("class", "clock-hand")
      .attr("stroke", d => (d.units === "seconds")? "red":"black")
      .attr("stroke-width", d => {
        if (d.units === "seconds") {
          return 2;
        } else if (d.units === "minutes") {
          return 3;
        } else if (d.units === "hours") {
          return 3;
        }
      })
      .attr("fill", "none");

    i++;
  });
}

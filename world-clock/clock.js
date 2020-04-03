/*
   This module is based on the wonderful tutorial by Eric S. Bullington at
   https://www.ericbullington.com/blog/2012/10/27/d3-oclock/

   The digital clock SVG is from:
   https://commons.wikimedia.org/wiki/Category:SVG_Digital_clocks
*/

// Get the current time and place into a D3 friendly data structure
const zones = {
  timeZones: ['UTC'],
  currentTime: new moment().utc(),
  addTimeZone: function(tz) {
    if (this.timeZones.indexOf(tz.toUpperCase()) < 0) this.timeZones.push(tz.toUpperCase())
  },
  removeTimeZone: function(tz) {
    this.timeZones = this.timeZones.filter(t => t !== tz.toUpperCase());
  },
  data: function() {
    var d = []
    this.currentTime = new moment().utc();
    this.timeZones.forEach((tz, i) => {
      var m = this.currentTime.tz(tz)
      d.push({
        zone: tz,
        digits: (m.format('HH:mm:ss')+((m.hours() < 12)? ';':'<')).split(''),
        time: [
          {units: "hours", number: m.hours()},
          {units: "minutes", number: m.minutes()},
          {units: "seconds", number: m.seconds()}
        ]
      })
    });
    return d;
  }
}

// Draw digits of clock
//  (; = AM, < = PM)
var drawDigits = function(selection) {
  // This version of D3 is not working as documented. There is no index variable
  // passed to each and this is not the current element. Manually tracking the
  // index and current node.
  var i=0;
  selection.each(d => {
    var svg = d3.select(selection.nodes()[i])
    var data = d.digits;
    var offsetX = offsetY = 0;
    svg.selectAll('.digit').data([]).exit().remove();
    data.forEach(digit => {
      var idx = digit.charCodeAt(0) - 48 // ASCII '0' is dec 48; ':;<' follow after '9'
      if (idx <= 12) {
        digits[idx](svg, offsetX, offsetY);
        offsetX += (idx === 10)? 15 : 30;
      }
    });
    i++;
  });
}

// Call from clock's container element selection
var createDigitalClock = function(parent) {
  var svg = parent.append('svg')
    .attr("width", 200)
    .attr("height", 37)
    .attr("viewBox", "0 0 210 50") // 30 x 6 digits + 15 x 2 colons + 30 x 1 AM/PM
    .attr("class", "digital-clock");
  var defs = svg.append("defs");
  defs.append("path")
    .attr("id", "vs")
    .attr("d","m.1,.1 l2.4,2.4 l2.5,-2.5 l2.5,-15.0 l-2.5,-2.5 l-2.4,2.4, l-2.5,15.0 z");
  defs.append("path")
    .attr("id", "hs")
    .attr("d","m0,0 l2.5,2.5 l10.0,0 l2.5,-2.5 l-2.5,-2.5 l-10.0,0 l-2.5,2.5 z");

  parent.selectAll('.digital-clock')
    .call(drawDigits);
}

var clockTop = function(g, offsetX, offfsetY) {
  g.append("use")
    .attr("href", "#hs")
    .attr("x", offsetX + 10.0)
    .attr("y", offsetY + 5.0);
}

var clockTopLeft = function(g, offsetX, offfsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 5.0)
    .attr("y", offsetY + 22.5);
}

var clockTopRight = function(g, offsetX, offfsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 20.0)
    .attr("y", offsetY + 22.5);
}

var clockMiddle = function(g, offsetX, offfsetY) {
  g.append("use")
    .attr("href", "#hs")
    .attr("x", offsetX + 7.5)
    .attr("y", offsetY + 25.0);
}

var clockBottomLeft = function(g, offsetX, offfsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 2.5)
    .attr("y", offsetY + 42.5);
}

var clockBottomRight = function(g, offsetX, offfsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 17.5)
    .attr("y", offsetY + 42.5);
}

var clockBottom = function(g, offsetX, offfsetY) {
  g.append("use")
    .attr("href", "#hs")
    .attr("x", offsetX + 5.0)
    .attr("y", offsetY + 45.0);
}

/* All digital clock numbers assume an SVG space of 30 x 50. */
var clock0 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopLeft(group, offsetX, offsetY)
  clockTopRight(group, offsetX, offsetY)
  clockBottomLeft(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
  clockBottom(group, offsetX, offsetY)
}

var clock1 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTopRight(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
}

var clock2 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopRight(group, offsetX, offsetY)
  clockMiddle(group, offsetX, offsetY)
  clockBottomLeft(group, offsetX, offsetY)
  clockBottom(group, offsetX, offsetY)
}

var clock3 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopRight(group, offsetX, offsetY)
  clockMiddle(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
  clockBottom(group, offsetX, offsetY)
}

var clock4 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTopLeft(group, offsetX, offsetY)
  clockTopRight(group, offsetX, offsetY)
  clockMiddle(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
}

var clock5 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopLeft(group, offsetX, offsetY)
  clockMiddle(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
  clockBottom(group, offsetX, offsetY)
}

var clock6 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopLeft(group, offsetX, offsetY)
  clockMiddle(group, offsetX, offsetY)
  clockBottomLeft(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
  clockBottom(group, offsetX, offsetY)
}

var clock7 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopRight(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
}

var clock8 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopLeft(group, offsetX, offsetY)
  clockTopRight(group, offsetX, offsetY)
  clockMiddle(group, offsetX, offsetY)
  clockBottomLeft(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
  clockBottom(group, offsetX, offsetY)
}

var clock9 = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  clockTop(group, offsetX, offsetY)
  clockTopLeft(group, offsetX, offsetY)
  clockTopRight(group, offsetX, offsetY)
  clockMiddle(group, offsetX, offsetY)
  clockBottomRight(group, offsetX, offsetY)
  clockBottom(group, offsetX, offsetY)
}

/* Digital clock colon (:) assumes an SVG space of 15 x 50. */
var clockColon = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("class", "digit");
  group.append("path")
    .attr("d", "m 12.5,17.5 a 3.86,3.78 0 1 1 0,-.01z")
    .attr("transform", "translate("+offsetX+","+offsetY+")")
  group.append("path")
    .attr("d", "m 12.5,17.5 a 3.86,3.78 0 1 1 0,-.01z")
    .attr("transform", "translate("+(offsetX-2.28)+","+(offsetY+17.5)+")")
}

var clockAM = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width", 0.1)
    .attr("style","text-anchor:end;font-size:20px;font-family:Arial")
    .attr("class", "digit");
  group.append("text")
    .attr("x", offsetX + 30.0)
    .attr("y", offsetY + 22.5)
    .text("AM");
}

var clockPM = function(svg, offsetX, offsetY) {
  var group = svg.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width", 0.1)
    .attr("style","text-anchor:end;font-size:20px;font-family:Arial")
    .attr("class", "digit");
  group.append("text")
    .attr("x", offsetX + 26.6)
    .attr("y", offsetY + 45.0)
    .text("PM");
}

// Clock digit drawing functions
const digits = [clock0, clock1, clock2, clock3, clock4, clock5, clock6, clock7, clock8, clock9, clockColon, clockAM, clockPM];

// Define the SVG box, placement of analog clock,
// and prepare scaling functions for the hands
const pi = Math.PI;
const scaleSecs = d3.scaleLinear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
const scaleMins = d3.scaleLinear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
const scaleHours = d3.scaleLinear().domain([0, 11 + 59/60]).range([0, 2 * pi]);

// Draw digits of clock
var drawHands = function(selection) {
  // This version of D3 is not working as documented. There is no index variable
  // passed to each and this is not the current element. Manually tracking the
  // index and current node.
  var i=0;
  selection.each(data => {
    var group = d3.select(selection.nodes()[i])
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

// Initialize SVG canvas and draw static portions of analog clock
// Call from clock's container element selection
var createAnalogClock = function(parent) {
  var svg = parent.append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("class", "analog-clock");

  var clockGroup = svg.append("g")
    .attr("class", "clock-group")
    .attr("transform", "translate(100,100)");

  clockGroup.append("circle")
    .attr("r", 80).attr("fill", "none")
    .attr("class", "clock outercircle")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  clockGroup.append("circle")
    .attr("r", 4)
    .attr("fill", "black")
    .attr("class", "clock innercircle");

  parent.selectAll('svg.analog-clock g.clock-group')
    .call(drawHands);
}

/*
setInterval(function() {
  var data;
  data = fields();
  return render(data);
}, 1000);
*/

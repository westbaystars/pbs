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
    this.timeZones.forEach((tz, i) => {
      var m = this.currentTime.tz(tz)
      d.push({
        zone: tz,
        digits: m.format('HH:mm:ss').split('')
      })
    });
    return d;
  }
}

// Draw digits of clock
var drawDigits = function(svg, data) {
  var offsetX = offsetY = 0;
  data.forEach((digit, i) => {
    var idx = digit.charCodeAt(0) - 48 // ASCII '0' is dec 48; ':' is after '9'
    if (idx <= 10) {
      digits[idx](svg, offsetX, offsetY);
      offsetX += (idx === 10)? 15 : 30;
    }
  });

}
// Call from clock's container element selection
var createClock = function(parent) {
  var svg = parent.append('svg')
    .attr("width", 210) /* 30 x 6 digits + 15 x 2 colons */
    .attr("height", 50)
    //.attr("viewBox", "0 0 84 20")
    .attr("class", "clock");
  var defs = svg.append("defs");
  defs.append("path")
    .attr("id", "vs")
    .attr("d","m.1,.1 l2.4,2.4 l2.5,-2.5 l2.5,-15.0 l-2.5,-2.5 l-2.4,2.4, l-2.5,15.0 z");
  defs.append("path")
    .attr("id", "hs")
    .attr("d","m0,0 l2.5,2.5 l10.0,0 l2.5,-2.5 l-2.5,-2.5 l-10.0,0 l-2.5,2.5 z");

  var digits = svg.selectAll('.clock-digit').data(parent.data());
  drawDigits(svg, parent.data()[0].digits)

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
  var group = svg.append("")
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

// Clock digit drawing functions
const digits = [clock0, clock1, clock2, clock3, clock4, clock5, clock6, clock7, clock8, clock9, clockColon];



/* Get the current time and place into a D3 friendly data structure *
var fields = function(tz) {
  var currentTime, hour, minute, second;
  currentTime = tz? new moment().tz(tz) : moment().utc()
  second = currentTime.seconds()
  minute = currentTime.minutes() // +seconds / 20 for smooth sweep second hand
  hour = currentTime.hours() + minute / 60
  return data = [
    { "unit": "seconds", "numeric": second },
    { "unit": "minutes", "numeric": minute },
    { "unit": "hours",   "numeric": hour }
  ]
}

/* Define the SVG box, placement of clock,
   and prepare scaling functions for the hands
*
var width, height, offSetX, offSetY, pi, scaleSecs, scaleMins, scaleHours;
width = 200;
height = 200;
offSetX = 100;
offSetY = 100;

pi = Math.PI;
scaleSecs = d3.scaleLinear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
scaleMins = d3.scaleLinear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
scaleHours = d3.scaleLinear().domain([0, 11 + 59/60]).range([0, 2 * pi]);

/* Initialize SVG canvas and draw static portions of clock *
var vis, clockGroup;

vis = d3.selectAll(".clock")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);

clockGroup = vis.append("g")
  .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

clockg.append("svg:circle")
  .attr("r", 80).attr("fill", "none")
  .attr("class", "clock outercircle")
  .attr("stroke", "black")
  .attr("stroke-width", 2);

clockg.append("svg:circle")
  .attr("r", 4)
  .attr("fill", "black")
  .attr("class", "clock innercircle");


/* Renderer takes a time data parameter and binds it to the hands of the clock *
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
    .append("path")
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
*/

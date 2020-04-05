/*
   The digital clock SVG is from:
   https://commons.wikimedia.org/wiki/Category:SVG_Digital_clocks
*/

// Call from clock's container element selection
function dClockCreate(container, width) {
  var svg = container.append('svg')
    .attr("width", width)
    .attr("height", width/5)
    .attr("viewBox", "0 0 250 50") // 30 x 6 digits + 15 x 2 colons + 30 x 1 AM/PM
    .attr("class", "digital-clock");
  var defs = svg.append("defs");
  defs.append("path")
    .attr("id", "vs")
    .attr("d","m.1,.1 l2.4,2.4 l2.5,-2.5 l2.5,-15.0 l-2.5,-2.5 l-2.4,2.4, l-2.5,15.0 z");
  defs.append("path")
    .attr("id", "hs")
    .attr("d","m0,0 l2.5,2.5 l10.0,0 l2.5,-2.5 l-2.5,-2.5 l-10.0,0 l-2.5,2.5 z");

  container.selectAll('.digital-clock')
    .call(dClockDrawDigits);
}

// Draw digits of clock
// Data should be a string value to the "digits" property in the form of:
//  \d{1,2}:\d{2}[:\d{2}]?[;|<]? where ; is the AM indicator and < is PM
function dClockDrawDigits(selection) {
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

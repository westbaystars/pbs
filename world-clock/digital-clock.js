/*
   The digital clock SVG parts are from:
   https://commons.wikimedia.org/wiki/Category:SVG_Digital_clocks
*/

var internalWidth = 250;   // 30 x 6 digits + 15 x 2 colons + 30 x 1 AM/PM indicator
var internalHeight = 50;

var enterDigits = function(enter) {
  var g = enter.append("g")
    .attr("fill","#d00")
    .attr("stroke","#fff")
    .attr("stroke-width","2")
    .attr("value", d => d.digit)
    .attr("x-offset", d => d.x)
    .classed("digit", true);
  
  // Because the digits are drawn as a set of functions rather than a single append,
  // we have to kind of bruite force the initial drawing of the digits by getting the
  // nodes, converting them back to a D3 selection, and using the data from there.
  g.nodes().forEach(g => {
    var g = d3.select(g);
    var ledIndex = g.datum().digit.charCodeAt(0) - 48 // ASCII of "0" is dec 48; {:;<} follow after "9"
    var offsetX = g.datum().x;
    g.classed('pulsable',ledIndex === 10)             // Reset if pulsible only for :
    DIGITS[ledIndex](g, offsetX, 0);                  // Call LED digit drawing function for current datum index
  });
};

// Update all of the digits (passed in the "update" parameter)
var updateDigits = function(update) {
  // Because the digits are drawn as a set of functions rather than a single append,
  // we have to kind of bruite force the initial drawing of the digits by getting the
  // nodes, converting them back to a D3 selection, and using the data from there.
  update.nodes().forEach(g => {
    var g = d3.select(g);
    var digit = g.datum().digit;
    var ledIndex = digit.charCodeAt(0) - 48 // ASCII of "0" is dec 48; {:;<} follow after "9"
    var offsetX = g.datum().x;
    if (digit !== g.attr('value') || offsetX !== Number(g.attr('x-offset'))) {
      g.attr('value',digit)
       .attr('x-offset',offsetX)
       .attr('stroke-width',2)                          // Reset stroke-width (changed in AM/PM render)
       .attr('style',null);                             // Clear style (just in case it was set previously)
      g.classed('pulsable',ledIndex === 10)             // Reset if pulsible only for :
      g.selectAll('.led').remove();
      DIGITS[ledIndex](g, offsetX, 0);                  // Call LED digit drawing function for current datum index
    }
  });
};

// Draw the digits for all digital clocks
// @svg - The SVG canvas for drawing the clock
// @gitits - Contains a string in the form "\d{1,2}:\d{2}[:\d{2}]?[;|<]?"
//           where ';' is the AM indicator and '<' is PM
//           All other characters in the string are ignored
var drawDigits = function (svg, digits) {
  // Need to keep track of X offset in data
  var data = [];
  var offsetX = 0;
  digits.replace(/[^\d:;<]/g,'')
    .split('')
    .map(d => { data.push({ digit: d, x: offsetX }); offsetX += (d === ':')? 15:30; }); // Colon is 15 units wide, otherwise 30
  
  // Select all digital clocks for updating
  svg.selectAll('g.digit')
    .data(data)
    .join(
      enter => enterDigits(enter),
      update => updateDigits(update),
      exit => exit.remove()
    )
  // Center the clock within the SVG canvas
  svg.attr('transform','translate('+((250-offsetX)/2)+',0)');
}

// Digital clock contructor
// @parent - A D3 selection with data property of a String named "digits"
// @digits - Contains a string of digits, colons, and optional ; or < for AM or PM indicators
// @width - The physical screen width for the digital clock
function createDigitalClock(parent, digits, width) {
  var svg = parent.append('svg')
    .attr("width", width)
    .attr("height", width/5)
    .attr("viewBox", "0 0 "+internalWidth+" "+internalHeight)
    .classed('digital-clock', true);

  // Define the digital "lit up" element drawing paths (vertical and horizontal)
  var defs = svg.append("defs");
  defs.append("path")
    .attr("id", "vs")
    .attr("d","m.1,.1 l2.4,2.4 l2.5,-2.5 l2.5,-15.0 l-2.5,-2.5 l-2.4,2.4, l-2.5,15.0 z");
  defs.append("path")
    .attr("id", "hs")
    .attr("d","m0,0 l2.5,2.5 l10.0,0 l2.5,-2.5 l-2.5,-2.5 l-10.0,0 l-2.5,2.5 z");

  drawDigits(svg, digits);
}

// Update digital clock with a new time (located in "update" data)
function updateDigitalClock(update) {
  // Skip this if not in update phase
  if (update.data().length === 0) return;
  
  drawDigits(update.select('svg.digital-clock'), update.datum().digits);
}

var ledTop = function(g, offsetX, offsetY) {
  g.append("use")
    .attr("href", "#hs")
    .attr("x", offsetX + 10.0)
    .attr("y", offsetY + 5.0)
    .classed('led',true);
}

var ledTopLeft = function(g, offsetX, offsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 5.0)
    .attr("y", offsetY + 22.5)
    .classed('led',true);
}

var ledTopRight = function(g, offsetX, offsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 20.0)
    .attr("y", offsetY + 22.5)
    .classed('led',true);
}

var ledMiddle = function(g, offsetX, offsetY) {
  g.append("use")
    .attr("href", "#hs")
    .attr("x", offsetX + 7.5)
    .attr("y", offsetY + 25.0)
    .classed('led',true);
}

var ledBottomLeft = function(g, offsetX, offsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 2.5)
    .attr("y", offsetY + 42.5)
    .classed('led',true);
}

var ledBottomRight = function(g, offsetX, offsetY) {
  g.append("use")
    .attr("href", "#vs")
    .attr("x", offsetX + 17.5)
    .attr("y", offsetY + 42.5)
    .classed('led',true);
}

var ledBottom = function(g, offsetX, offsetY) {
  g.append("use")
    .attr("href", "#hs")
    .attr("x", offsetX + 5.0)
    .attr("y", offsetY + 45.0)
    .classed('led',true);
}

/* All digital clock numbers assume an SVG space of 30 x 50. */
var led0 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopLeft(group, offsetX, offsetY)
  ledTopRight(group, offsetX, offsetY)
  ledBottomLeft(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
  ledBottom(group, offsetX, offsetY)
}

var led1 = function(group, offsetX, offsetY) {
  ledTopRight(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
}

var led2 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopRight(group, offsetX, offsetY)
  ledMiddle(group, offsetX, offsetY)
  ledBottomLeft(group, offsetX, offsetY)
  ledBottom(group, offsetX, offsetY)
}

var led3 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopRight(group, offsetX, offsetY)
  ledMiddle(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
  ledBottom(group, offsetX, offsetY)
}

var led4 = function(group, offsetX, offsetY) {
  ledTopLeft(group, offsetX, offsetY)
  ledTopRight(group, offsetX, offsetY)
  ledMiddle(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
}

var led5 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopLeft(group, offsetX, offsetY)
  ledMiddle(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
  ledBottom(group, offsetX, offsetY)
}

var led6 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopLeft(group, offsetX, offsetY)
  ledMiddle(group, offsetX, offsetY)
  ledBottomLeft(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
  ledBottom(group, offsetX, offsetY)
}

var led7 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopRight(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
}

var led8 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopLeft(group, offsetX, offsetY)
  ledTopRight(group, offsetX, offsetY)
  ledMiddle(group, offsetX, offsetY)
  ledBottomLeft(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
  ledBottom(group, offsetX, offsetY)
}

var led9 = function(group, offsetX, offsetY) {
  ledTop(group, offsetX, offsetY)
  ledTopLeft(group, offsetX, offsetY)
  ledTopRight(group, offsetX, offsetY)
  ledMiddle(group, offsetX, offsetY)
  ledBottomRight(group, offsetX, offsetY)
  ledBottom(group, offsetX, offsetY)
}

/* Digital clock colon (:) assumes an SVG space of 15 x 50. */
var ledColon = function(group, offsetX, offsetY) {
  group.append("path")
    .attr("d", "m 12.5,17.5 a 3.86,3.78 0 1 1 0,-.01z")
    .attr("transform", "translate("+offsetX+","+offsetY+")")
    .classed('led',true);
  group.append("path")
    .attr("d", "m 12.5,17.5 a 3.86,3.78 0 1 1 0,-.01z")
    .attr("transform", "translate("+(offsetX-2.28)+","+(offsetY+17.5)+")")
    .classed('led',true);
}

var ledAM = function(group, offsetX, offsetY) {
  group
    .attr('stroke-width',0.1)
    .attr('style','text-anchor:end;font-size:20px;font-family:Arial;');
  group.append("text")
    .attr("x", offsetX + 30.0)
    .attr("y", offsetY + 22.5)
    .classed('led',true)
    .text("AM");
}

var ledPM = function(group, offsetX, offsetY) {
  group
    .attr('stroke-width',0.1)
    .attr('style','text-anchor:end;font-size:20px;font-family:Arial;');
  group.append("text")
    .attr("x", offsetX + 26.6)
    .attr("y", offsetY + 45.0)
    .classed('led',true)
    .text("PM");
}

// Clock digit drawing functions
const DIGITS = [led0, led1, led2, led3, led4, led5, led6, led7, led8, led9, ledColon, ledAM, ledPM];

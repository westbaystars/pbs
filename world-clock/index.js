/* Script to run the World Clock web app page
   Assumes digital-clock.js and analog-clock.js have been imported

   Data drives the creation of cards on the page. Each card contains a time zone name, the time
   in a string format for display on a digital clock, and sequence of hours, minutes, seconds in
   D3 friendly unit/number object pairs for an analog clock.
*/

// Store the current settings, time, and time zones into a D3 friendly data structure
const settings = {
  show24: d3.select('#show24Hour').property('checked'),
  showSeconds: d3.select('#showSeconds').property('checked'),
  showPulsing: d3.select('#pulsing').property('checked'),
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
    var timeFormat = '' + (this.show24? 'HH':'h') + ':mm' + (this.showSeconds? ':ss':'') + (this.show24?  '':'A');

    this.currentTime = new moment().utc();
    this.pulseLevel = ((this.currentTime.seconds() % 2) * 1 + .1);  // Opacity goes from 0 to 1 (or more)
    this.timeZones.forEach((tz, i) => {
      var m = this.currentTime.tz(tz)
      d.push({
        zone: tz,
        digits: m.format(timeFormat).replace('AM',';').replace('PM','<'),
        time: [
          {units: "hours", number: m.hours() + m.minutes() / 60}, // Includining minutes allows hour hand to move between hours
          {units: "minutes", number: m.minutes()},
          {units: this.showSeconds? "seconds":"x", number: m.seconds()}
        ]
      })
    });
    return d;
  },
  init: () => {
    d3.select('#show24Hour').on('change', () => { settings.show24 = d3.select('#show24Hour').property('checked'); });
    d3.select('#showSeconds').on('change', () => { settings.showSeconds = d3.select('#showSeconds').property('checked'); });
    d3.select('#pulsing').on('change', () => {
      settings.showPulsing = d3.select('#pulsing').property('checked');
      // Reset to full opacity when toggled to start
      d3.selectAll('.pulsable')
        .style("opacity", 1);
     });
  }
}
settings.init();

var container = d3.select('#container');

function createCard(enter) {
  // Don't do anything if there is no data attached to the enter object (already created)
  if (enter.data().length === 0) return;
  
  var data = enter.datum();
  var timeCards = enter.append('div')
      .attr('class','card time-card')
      .style('width','15rem')
  timeCards.append('h2')
    .attr("class", "card-header h4 text-primary border-primary")
    .text(d => d.zone);
  var body = timeCards.append('div')
    .attr('class', 'card-body');
  aClockCreate(body, 200);
  createDigitalClock(body, data.digits, 200);
}

function updateCard(update) {
  update.selectAll('.card-header')
    .text(d => d.zone);
  update.selectAll('.card-body .analog-clock .clock-group')
    .call(aClockDrawHands);
  update.call(updateDigitalClock);
  if (settings.showPulsing) {
    d3.selectAll('.pulsable')
      .transition()
      .style("opacity", settings.pulseLevel);
  }
}

function render(data) {
  // Select all cards, assigning data
  var cards = container.selectAll('.time-card')
    .data(data)
    .join(
      enter => {
        createCard(enter);
        // Make sure data is propogated to children
        container.selectAll('.time-card').data(data).select('.card-header');
        container.selectAll('.time-card').data(data).select('.card-body .analog-clock .clock-group');
        //container.selectAll('.time-card').data(data).select('.card-body .digital-clock');
      },
      update => updateCard(update),
      exit => exit.remove()
    );
}

//render(settings.data());

setInterval(function() {
  var data = settings.data();
  return render(data);
}, 1000);

setInterval(function() {
  if (settings.showPulsing) {
    d3.selectAll('.pulsable')
    .transition()
    .style("opacity", settings.pulseLevel);
  }
}, 1000)


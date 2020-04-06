/* Script to run the World Clock web app page */
/* Assumes clock.js has been imported with object zones available as data souce */

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
    this.pulseLevel = ((this.currentTime.seconds() % 4) * 30);
    this.timeZones.forEach((tz, i) => {
      var m = this.currentTime.tz(tz)
      d.push({
        zone: tz,
        digits: m.format(timeFormat).replace('AM',';').replace('PM','<').split(''),
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
    d3.select('#pulsing').on('change', () => { settings.showPulsing = d3.select('#pulsing').property('checked'); });
  }
}
settings.init();

var container = d3.select('#container');

function createCard(enter) {
  var timeCards = enter.append('div')
      .attr('class','card time-card')
      .style('width','15rem')
  timeCards.append('h2')
    .attr("class", "card-header h4 text-primary border-primary")
    .text(d => d.zone);
  var body = timeCards.append('div')
    .attr('class', 'card-body');
  aClockCreate(body, 200);
  dClockCreate(body, 200);
}

function updateCard(update) {
  update.selectAll('.card-header')
    .text(d => d.zone);
  update.selectAll('.card-body .analog-clock .clock-group')
    .call(aClockDrawHands);
  update.selectAll('.card-body .digital-clock')
    .call(dClockDrawDigits);
  if (settings.showPulsing) {
    d3.selectAll('.pulsing')
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
        container.selectAll('.time-card').data(data).select('.card-body .digital-clock');
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
    d3.selectAll('.pulsing')
    .transition()
    .style("opacity", settings.pulseLevel);
  }
}, 2000)

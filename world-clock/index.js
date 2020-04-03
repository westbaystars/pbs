/* Script to run the World Clock web app page */
/* Assumes clock.js has been imported with object zones available as data souce */

var container = d3.select('#container');

function createCard(enter) {
  var timeCards = enter.append('div')
      .attr('class','card time-card')
      .style('width','18rem')
  timeCards.append('h2')
    .attr("class", "card-header h4 text-primary border-primary")
    .text(d => d.zone);
  var body = timeCards.append('div')
    .attr('class', 'card-body');
  createAnalogClock(body);
  createDigitalClock(body);
}

function updateCard(update) {
  update.selectAll('.card-header')
    .text(d => d.zone);
  update.selectAll('.card-body .digital-clock')
    .call(drawDigits);
  update.selectAll('.card-body .analog-clock .clock-group')
    .call(drawHands);
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
        container.selectAll('.time-card').data(data).select('.card-body .digital-clock');
        container.selectAll('.time-card').data(data).select('.card-body .analog-clock .clock-group');
      },
      update => updateCard(update),
      exit => exit.remove()
    );
}

//render(zones.data());

setInterval(function() {
  var data = zones.data();
  return render(data);
}, 1000);

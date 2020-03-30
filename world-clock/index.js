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
  createClock(body);
}

function updateCard(update) {
  update.selectAll('.card-header')
    .text(d => d);
}

function render(data) {
  // Select all cards, assigning data
  var cards = container.selectAll('.time-card')
    .data(data)
    .join(
      enter => {
        createCard(enter);
        // Make sure data is propogated to children
        container.selectAll('.time-card').data(data).select('h2');
        container.selectAll('.time-card').data(data).select('div')
      },
      update => updateCard(update),
      exit => exit.remove()
    );

  // Update time card headers
  //d3.selectAll('.time-card .card-header')
  //  .text(d => d.zone)
  //d3.selectAll('.time-card .card-body')
  //  .call(digitalClock);
}

/*
setInterval(function() {
  var data = zones.data();
  return render(data);
}, 1000);
*/

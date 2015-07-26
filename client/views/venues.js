/*
 * Venue list template, export button functionality
 */

// Based on http://stackoverflow.com/a/24922761
// fixed undefined item
var processCsvRow = function (row) {
  var finalVal = '';

  for (var j = 0; j < row.length; j++) {
    var item = row[j],
        innerValue = '';

    if (! _.isUndefined(item)) {
      if (_.isDate(item)) {
        innerValue = item.toLocaleString();
      } else {
        innerValue = item.toString();
      }
    }

    var result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0)
      result = '"' + result + '"';
    if (j > 0)
      finalVal += ',';
    finalVal += result;
  }
  return finalVal + '\n';
};

function exportToCsv(filename, rows) {
  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
    csvFile += processCsvRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");

    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

Template.venues.helpers({
  venueList: function() {
    return Session.get('venues');
  }
});

Template.venues.events({
  'click [data-action="export"]': function(e, t) {
    console.log('>>>');
    var venues = Session.get('venues');

    var csvData = _.map(venues, function(v) {
      var loc = v.location;
      return [v.name, loc.city, loc.address, loc.lat, loc.lng];
    });
    console.log(csvData);

    exportToCsv('venues.csv', csvData);
  }
});

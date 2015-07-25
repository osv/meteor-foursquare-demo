/*
 * Map template with query input
 *
 */

var map;

Template.map.onRendered(function () {
  Mapbox.debug = true;
  Mapbox.load();

  this.autorun(function () {
    // bind ti div.map mapvox
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = 'pk.eyJ1Ijoib2xleCIsImEiOiIwN2FkZTc5MDI0ODg2NTZiNGRjZjI2NWZjMzhjYWQ0ZiJ9.z2IjKFJX9EMtn_djhbe_7w';
      map = L.mapbox.map('map', 'olex.n0b9h12a');
    }
  });
});

Template.input.events({
  // search query form
  'submit form': function(e, t) {
    e.preventDefault();
    var query = t.find('input').value,
        location = map.getCenter(),
        lat = location.lat,
        lng = location.lng;

    Meteor.call('foursquare-search', lat, lng, query, function(err, venues) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Venues', venues);
    });
  }
});

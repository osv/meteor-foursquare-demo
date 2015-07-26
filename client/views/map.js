/*
 * Map template with input query field
 *
 */

Template.map.onRendered(function () {
  var self = this;
  Mapbox.debug = true;
  Mapbox.load({
    plugins: ['markercluster']
  });

  this.autorun(function () {
    // bind ti div.map mapvox
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = 'pk.eyJ1Ijoib2xleCIsImEiOiIwN2FkZTc5MDI0ODg2NTZiNGRjZjI2NWZjMzhjYWQ0ZiJ9.z2IjKFJX9EMtn_djhbe_7w';
      self.map = L.mapbox.map('map', 'olex.n0b9h12a');
    }
  });
});

Template.map.events({
  // search query form
  'submit form': function(e, t) {
    e.preventDefault();

    var query = t.find('input').value,
        map = t.map,
        markers = t.markers,
        location = map.getCenter(),
        lat = location.lat,
        lng = location.lng;

    Meteor.call('foursquare-search', lat, lng, query, function(err, venues) {
      if (err) {
        console.log(err);
        return;
      }

      // clear old markers
      if (markers) {
        map.removeLayer(markers);
      }

      // save in template instance mapbox marker cluster
      t.markers = markers = new L.MarkerClusterGroup();

      _.each(venues, function(venue) {
        var location = venue.location,
            ll = new L.LatLng(location.lat, location.lng),
            title = venue.name,
            url = venue.url,
            // marker popup, title + url
            popup = title + (url ? '<br /><a href="' + url + '" target="_blank">' + url + '</a>' : ''),
            // marker
            marker = L.marker(ll, {
              icon: L.mapbox.marker.icon({'marker-symbol': 'marker-stroked', 'marker-color': '0044FF'}),
              title: title
            });

        marker.bindPopup(popup);
        markers.addLayer(marker);
      });

      map.addLayer(markers);
      console.log('Venues', venues);
    });
  }
});

Template.map.onRendered(function () {
  Mapbox.debug = true;
  Mapbox.load();

  this.autorun(function () {
    // bind ti div.map mapvox
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = 'pk.eyJ1Ijoib2xleCIsImEiOiIwN2FkZTc5MDI0ODg2NTZiNGRjZjI2NWZjMzhjYWQ0ZiJ9.z2IjKFJX9EMtn_djhbe_7w';
      var map = L.mapbox.map('map', 'olex.n0b9h12a');
    }
  });
});


var foursquare_id = process.env.FOURSQUARE_ID,
    foursquare_secret = process.env.FOURSQUARE_SECRET;

if (! foursquare_secret || ! foursquare_id) {
  console.log('!! You should set both, FOURSQUARE_ID and FOURSQUARE_SECRET env variables');
}

Meteor.methods({
  // return array of venues
  'foursquare-search': function(lat, lng, query, radius) {

    if (! foursquare_secret || ! foursquare_id) {
      throw new Meteor.Error('Foursqaure not configured');
    }

    if(!this.userId) {
      throw new Meteor.Error('Permission denied');
    }

    check(lat, Number);
    check(lng, Number);
    check(query, String);
    check(radius, Number);

    var result,
        params = {
          client_id: foursquare_id,
          client_secret: foursquare_secret,
          v: 20150606,
          query: query,
          radius: radius,
          limit: 50,
          ll: '' + lat + ',' + lng,
    };

    try {
      result = HTTP.get('https://api.foursquare.com/v2/venues/search', {
        params: params,
        timeout: 20000
      });
    } catch(error) {
      throw new Meteor.Error('Foursquare api call failed');
    }

    // save query in db
    Queries.insert({
      userId: this.userId,
      lat: lat,
      lng: lng,
      query: query,
      radius: radius,
    });

    return result.data.response.venues;
  },
});

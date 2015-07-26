Template.queries.helpers({
  queries: function() {
    var options = {
      sort: {
        createdAt: -1
      }
    };
    // don't need filter by userId
    return Queries.find({}, options);
  }
});

Template.query.helpers({
  toFixed: function(num, digits) {
    return Number(num).toFixed(digits);
  }
});

Template.queries.helpers({
  queries: function() {
    var options = {
      sort: {
        createdAt: -1
      }
    };
    // don't need filter by userId
    return Queries.find({}, options);
  },

  haveQueries: function() {
    return Queries.find().count();
  }
});

Template.query.helpers({
  toFixed: function(num, digits) {
    return Number(num).toFixed(digits);
  },

  radiusKm: function() {
    var radius = Number(this.radius) / 1000;
    console.log(this);

    return radius.toFixed(1);
  }
});

Template.query.events({
  'click [data-action="remove"]': function(e, t) {
    console.log(this);
    var query = this.query,
        doc_id = this._id;

    if (confirm('Remove "' + query + '"')) {
      Queries.remove(doc_id);
    }

  }
});

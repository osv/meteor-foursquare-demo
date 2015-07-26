/*
 * Collection for users's queries.
 * Pub-sub quueries
 */

var schema = new SimpleSchema({
  userId: {
    type: String,
  },

  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function() {
      return new Date();
    }
  },

  lat: {
    type: Number,
    decimal: true,
  },

  lng: {
    type: Number,
    decimal: true,
  },

  query: {
    type: String
  },

  radius: {
    type: Number,
    decimal: true,
  },
});

Queries = new Meteor.Collection('queries');
Queries.attachSchema(schema);

Queries.allow({
  // allow delete if user is owner of doc
  remove: function (userId, doc) {
    return doc.userId === userId;
  },
});

// subscribe
if (Meteor.isClient) {

  Meteor.startup(function() {
    Meteor.subscribe('queries');
  });
}

// publication
if (Meteor.isServer) {

  // publish user's last 10 queries
  Meteor.publish('queries', function() {
    var userId = this.userId,
        query = {
          userId: userId
        },
        options = {
          sort: {
            createdAt: -1
          },
          limit: 10
        };

    return Queries.find(query, options);
  });
}

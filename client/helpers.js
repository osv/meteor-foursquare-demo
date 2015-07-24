// return true if signed in
UI.registerHelper('signedIn', function () {
  return !!Meteor.user();
});

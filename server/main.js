import '../imports/api/tutors.js';
import { Meteor } from 'meteor/meteor';
Meteor.users.allow({
  update: function(userId, user) {
    return true;
  }
});

import { Meteor } from 'meteor/meteor'
import '../imports/startup/accounts-config.js'
import '../imports/ui/body.js'
import { Tutors } from '../imports/api/tutors.js';
Meteor.users.deny({
  update() { return true; }
});

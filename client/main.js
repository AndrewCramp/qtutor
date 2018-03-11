import { Meteor } from 'meteor/meteor'
import '../imports/startup/accounts-config.js'
import '../imports/ui/body.js'
import { Tutors } from '../imports/api/tutors.js';
Meteor.users.deny({
  update() { return true; }
});
Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailvar = event.target.loginEmail.value;
    var passwordvar = event.target.loginPassword.value;
    console.log("Form Submitted");
    Meteor.loginWithPassword(emailvar, passwordvar);
  }
});

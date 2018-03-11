import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tutors } from '../api/tutors.js';
import './availability.js';
import './tutor.js';
import './login.js';
import './register.js';
import './body.html';
import './dashboard.js';
Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailvar = event.target.registerEmail.value;
    var passwordvar = event.target.registerPassword.value;
    var firstvar = event.target.firstName.value;
    var lastvar = event.target.lastName.value;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      })
    }
    if(event.target.tutor.value == "tutor-yes"){
      Tutors.insert({
        firstName: firstvar,
        lastName: lastvar,
        email: emailvar,
        available: false,
        location: {

        },
        courses: {

        }
      });
      var tutor = true;
    }else{
      var tutor = false;
    }
    Accounts.createUser({
      email: emailvar,
      password: passwordvar,
      profile: {
        isTutor: tutor
      }
    });
    Meteor.loginWithPassword(emailvar, passwordvar);
  }
});

Template.body.helpers({
  tutors(){
    return Tutors.find({});
  },
});

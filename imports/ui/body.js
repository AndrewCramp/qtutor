import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tutors } from '../api/tutors.js';
import './availability.js';
import './login.js';
import './register.js';
import './body.html';
import './dashboard.js';
import'./map.js';
import'./request.js';
Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailvar = event.target.registerEmail.value;
    var passwordvar = event.target.registerPassword.value;
    var firstvar = event.target.firstName.value;
    var lastvar = event.target.lastName.value;
    var tutorvar = event.target.tutor.value;
    var APSC111var = event.target.apsc111.checked;
    var APSC171var = event.target.apsc171.checked;
    var APSC131var = event.target.apsc131.checked;
    var APSC143var = event.target.apsc143.checked;
    var APSC151var = event.target.apsc151.checked;
    var tutorId;
    if(emailvar && passwordvar && firstvar && lastvar && tutorvar){
      if(tutorvar == "tutor-yes" ){
        var latLng = Geolocation.latLng();
        tutorId = Tutors.insert({
          firstName: firstvar,
          lastName: lastvar,
          email: emailvar,
          available: false,
          location: {
            latitude: null,
            longitude: null
          },
          courses: {
                APSC111: APSC111var,
                APSC171: APSC171var,
                APSC151: APSC151var,
                APSC143: APSC143var,
                APSC131: APSC131var
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
          isTutor: tutor,
          tutor_id: tutorId
        }
      });
      Meteor.loginWithPassword(emailvar, passwordvar);
      $('#register-modal').modal('hide');
    }else{
      document.getElementById('registerError').style.display = "list-item";
    }
  }
});

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailvar = event.target.loginEmail.value;
    var passwordvar = event.target.loginPassword.value;
    Meteor.loginWithPassword(emailvar, passwordvar);
    $('#login-modal').modal('hide');
  }
});
Template.body.helpers({
  tutors(){
    return Tutors.find({});
  },
});

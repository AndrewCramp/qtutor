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
    if(emailvar && passwordvar && firstvar && lastvar && tutorvar){
      if(tutorvar == "tutor-yes" ){
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
    console.log("Form Submitted");
    Meteor.loginWithPassword(emailvar, passwordvar);
    $('#login-modal').modal('hide');
  }
});
Template.body.helpers({
  tutors(){
    return Tutors.find({});
  },
});

import '../imports/startup/accounts-config.js'
import '../imports/ui/body.js'

Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailvar = event.target.registerEmail.value;
    var passwordvar = event.target.registerPassword.value;
    var tutor = event.target.tutor.value;
    console.log("Form Submitted");
    Accounts.createUser({
      email: emailvar,
      password: passwordvar
    });
    Meteor.loginWithPassword(emailvar, passwordvar);
  }
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

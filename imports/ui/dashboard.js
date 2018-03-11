import { Template } from 'meteor/templating';
import './dashboard.html'

Template.dashboard.events({
  'click #logout': function(event){
    event.preventDefault();
    Meteor.logout();
  }
});

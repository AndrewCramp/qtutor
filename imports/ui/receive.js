import { Template } from 'meteor/templating';
import { Tutors } from '../api/tutors.js';
import { Meteor } from 'meteor/meteor';
import './receive.html'

Template.receive.name= function(){
    var tutorid = Meteor.user().profile.tutor_id;
    var tutor = Tutors.findOne({_id: tutorid});
    var name = tutor.request.name;
    var marker2 = null;
    if(tutor.hasRequest){
    var latLng =  new google.maps.LatLng(tutor.request.latitude,tutor.request.longitude);
    marker2 = new google.maps.Marker({
        position: latLng,
        map: GoogleMaps.maps.map.instance
      });
      GoogleMaps.maps.map.instance.setZoom(19);
      GoogleMaps.maps.map.instance.setCenter(latLng);
    }
    console.log(marker2);
    return name;
}

Template.receive.email= function(){
    var tutorid = Meteor.user().profile.tutor_id;
    var email = Tutors.findOne({_id: tutorid}).request.email;
    return email;
}

Template.receive.course= function(){
    var tutorid = Meteor.user().profile.tutor_id;
    var course = Tutors.findOne({_id: tutorid}).request.course;
    return course;
}

Template.receive.duration= function(){
    var tutorid = Meteor.user().profile.tutor_id;
    var duration = Tutors.findOne({_id: tutorid}).request.time;
    return duration;
}

Template.receive.hasRequest= function(){
    var tutorid = Meteor.user().profile.tutor_id;
    var hasRequest = Tutors.findOne({_id: tutorid}).hasRequest;
    return hasRequest;
}

Template.receive.events({
  'click #decline': function(event) {
    var tutorid = Meteor.user().profile.tutor_id;
    Tutors.update({_id : Meteor.user().profile.tutor_id}, {$set:
      {
        hasRequest: false,
      }
    });
    Meteor.users.update({_id: Tutors.findOne({_id: tutorid}).request.id}, {$set: {"profile.sentRequest": false}});
  },
  'click #accept': function(event) {
    var tutorid = Meteor.user().profile.tutor_id;
    Meteor.users.update({_id: Tutors.findOne({_id: tutorid}).request.id}, {$set: {"profile.RequestAccepted": true}});
    Meteor.users.update({_id: Tutors.findOne({_id: tutorid}).request.id}, {$set: {"profile.tutor.email": Meteor.user().emails[0].address}});
    Meteor.users.update({_id: Tutors.findOne({_id: tutorid}).request.id}, {$set: {"profile.tutor.name": Meteor.user().profile.firstName+' '+Meteor.user().profile.lastName}});
  }
});

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

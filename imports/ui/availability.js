import { Template } from 'meteor/templating';
import { Tutors } from '../api/tutors.js';
import './availability.html'
var marker = null;
Template.availability.events({
  'click #available': function(event) {
    var latLng = Geolocation.latLng();
    Tutors.update({_id : Meteor.user().profile.tutor_id}, {$set:
      {
        available: true,
        location: {
          latitude: latLng.lat,
          longitude: latLng.lng
        },
      }
    });
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: GoogleMaps.maps.map.instance
    });
    console.log(marker);
    document.getElementById('request-button').style.display = "none";
    GoogleMaps.maps.map.instance.setZoom(19);
    GoogleMaps.maps.map.instance.setCenter(latLng);
  }
});

Template.availability.events({
  'click #notAvailable': function(event) {
    console.log();
    Tutors.update({_id : Meteor.user().profile.tutor_id}, {$set: {available: false}});
    document.getElementById('request-button').style.display = "list-item";
    marker.setPosition(null);
    GoogleMaps.maps.map.instance.setCenter(new google.maps.LatLng(44.2256, -76.4949));
    GoogleMaps.maps.map.instance.setZoom(16);
    }
});

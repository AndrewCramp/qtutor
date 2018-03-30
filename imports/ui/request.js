import { Template } from 'meteor/templating';
import './request.html'
import {Tutors} from "../api/tutors";

var rad = function(x) {
    return x * Math.PI / 180;
};

function tutor_update(sorted,n,coursevar){
    Tutors.update({_id : sorted[n][0]}, {$set:
            {
                hasRequest: true,
                request: {
                    "email" : Meteor.user().emails[0].address,
                    "name" : Meteor.user().profile.firstName+' '+Meteor.user().profile.lastName,
                    "course" : coursevar.value,
                    "latitude" : Geolocation.latLng().lat,
                    "longitude" : Geolocation.latLng().lng
                }
            }
    });
    console.log(sorted[n][0]);
    console.log(sorted[n][1]);
}

function distance(location1, location2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (location2.lat - location1.lat) * Math.PI / 180;
    var dLon = (location2.lng - location1.lng) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(location1.lat * Math.PI / 180) * Math.cos(location2.lat * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return Math.round(d * 1000); // meters
}

function Sort_dist(data,l) {
    var swapp;
    var n = l-1;
    var x=data;
    do {
        swapp = false;
        for (var a=0; a < n; a++)
        {
            if (x[a][1] > x[a+1][1])
            {
                var temp0 = x[a][0];
                var temp1 = x[a][1];
                x[a][0] = x[a+1][0];
                x[a][1] = x[a+1][1];
                x[a+1][0] = temp0;
                x[a+1][1] = temp1;
                swapp = true;
            }
        }
        n--;
    } while (swapp);
    return x;
}

Template.request.events({
    'submit form': function (event) {
        event.preventDefault();
        var coursevar = event.target.courseSelector;
        var lenghtvar = event.target.timeSelector;
        var tutorDist = new Array(100);
        var i=0;
        for(var j = 0; j < 100;j++){
            tutorDist[j] = new Array(2);
        }

        Tutors.find().forEach(function (tutorLoc) {
            //if gpa/rating/if connected then stop availibility

            if (coursevar.value == 'APSC111'){
                if (tutorLoc.courses.APSC111) {
                    var location1 = {lat: tutorLoc.location.latitude, lng: tutorLoc.location.longitude};
                    var location2 = Geolocation.latLng();
                    tutorDist[i][0] = tutorLoc._id;
                    tutorDist[i][1] = distance(location1, location2);
                    i++;
                }
            }else if (coursevar.value == 'APSC131'){
                if (tutorLoc.courses.APSC131) {
                    var location1 = {lat: tutorLoc.location.latitude, lng: tutorLoc.location.longitude};
                    var location2 = Geolocation.latLng();
                    tutorDist[i][0] = tutorLoc._id;
                    tutorDist[i][1] = distance(location1, location2);
                    i++;
                }
            }else if (coursevar.value == 'APSC143'){
                if (tutorLoc.courses.APSC143) {
                    var location1 = {lat: tutorLoc.location.latitude, lng: tutorLoc.location.longitude};
                    var location2 = Geolocation.latLng();
                    tutorDist[i][0] = tutorLoc._id;
                    tutorDist[i][1] = distance(location1, location2);
                    i++;
                }
            }else if (coursevar.value == 'APSC171'){
                if (tutorLoc.courses.APSC171) {
                    var location1 = {lat: tutorLoc.location.latitude, lng: tutorLoc.location.longitude};
                    var location2 = Geolocation.latLng();
                    tutorDist[i][0] = tutorLoc._id;
                    tutorDist[i][1] = distance(location1, location2);
                    i++;
                }
            }else if (coursevar.value == 'APSC151'){
                if (tutorLoc.courses.APSC151) {
                    var location1 = {lat: tutorLoc.location.latitude, lng: tutorLoc.location.longitude};
                    var location2 = Geolocation.latLng();
                    tutorDist[i][0] = tutorLoc._id;
                    tutorDist[i][1] = distance(location1, location2);
                    i++;
                }
            }
        });
        var sorted = Sort_dist(tutorDist,i);
        console.log(Meteor.user().profile.isTutor);
        if (Meteor.user().profile.isTutor){
            if (sorted[0][0]==Meteor.user().profile.tutor_id){
                tutor_update(sorted,1,coursevar);
            }else{
                tutor_update(sorted,0,coursevar);
            }
        }else{
            tutor_update(sorted,0,coursevar);
        }
    }
});






//document.getElementById('registerError').style.display = "list-item";
//<!option value="null"Please Select a course/option>

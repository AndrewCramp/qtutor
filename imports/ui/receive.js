import { Template } from 'meteor/templating';
import { Tutors } from '../api/tutors.js';
import { Meteor } from 'meteor/meteor';
import './receive.html'

Template.receive.name= function(){
    var tutorid = Meteor.user().profile.tutor_id;
    var name = Tutors.findOne({_id: tutorid}).request.name;
    console.log(name);
    return name;
}

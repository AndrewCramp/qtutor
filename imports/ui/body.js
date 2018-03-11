import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tutors } from '../api/tutors.js';
import './tutor.js';
import './login.js';
import './register.js';
import './body.html';
import './dashboard.js';
Template.body.helpers({
  tutors(){
    return Tutors.find({});
  },
});

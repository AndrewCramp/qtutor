import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tutors } from '../api/tutors.js';
import './tutor.js';
import './body.html';

Template.body.helpers({
  tutors(){
    return Tutors.find({});
  },
});

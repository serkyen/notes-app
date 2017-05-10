import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import '../imports/api/users'; //executes the file on server start
import '../imports/api/notes'; 
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  // code to run on server at startup
});

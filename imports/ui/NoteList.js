import {Meteor} from 'meteor/meteor';
import React from 'react';
// import {Tracker} from 'meteor/tracker';

import {createContainer} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader/>
      NoteList {props.notes.length}
      {props.notes.map((note) => {
        return <NoteListItem key={note._id} note={note}/>
      })}
    </div>
  );
};

NoteList.PropTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);

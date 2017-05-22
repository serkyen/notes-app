import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Session} from 'meteor/session';
// import {Tracker} from 'meteor/tracker';

import {createContainer} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {
  return (
    <div className="item-list">
      <NoteListHeader/>
      {props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }

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
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({},{sort:{updatedAt: -1}}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })

  };
}, NoteList);

import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        props.meteorCall('notes.insert')
      }} className="button">New Note</button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';

//ES6 Class Based Component
// imports like this.... import { Editor } from './Editor';
export class Editor extends React.Component {
  render() {

    if (this.props.note) {
      return (
        <p>We got a note!</p>
      )
    } else if (this.props.selectedNoteId) {
      return (
        <p>Note not found.</p>
      )
    } else {
      return (
        <p>Pick or create a note to get started.</p>
      )
    }

  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,

}

// if you use this, then import Editor from './Editor';
export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  //return object as props to editor.
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  };
}, Editor);



//Another way... import Editor from './Editor';
// const Editor = () => {
//     return (
//     <div>Editor</div>
//   );
// };
//
// export default Editor;

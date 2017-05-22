import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';
import {Meteor} from 'meteor/meteor';

//ES6 Class Based Component
// imports like this.... import { Editor } from './Editor';
export class Editor extends React.Component {

  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }

  render() {

    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder="Type a title" onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.props.note.body} placeholder="Type a note" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delete Note</button>
        </div>
      )
    } else {
      return (
        <p>
          {this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
        </p>
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
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
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

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';
//ES6 Class Based Component
// imports like this.... import { Editor } from './Editor';
export class Editor extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        title: '',
        body: ''
      };
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({title})
    this.props.call('notes.update', this.props.note._id, {title});
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({body})
    this.props.call('notes.update', this.props.note._id, {body});
  }
  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }
  //life cycle method
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
  }

  render() {

    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Untitled Note" onChange={this.handleTitleChange.bind(this)}/>
          <textarea className="editor__body" value={this.state.body} placeholder="Type a note..." onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Note</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
          </p>
        </div>
      )
    }

  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
}

// if you use this, then import Editor from './Editor';
export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  //return object as props to editor.
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
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

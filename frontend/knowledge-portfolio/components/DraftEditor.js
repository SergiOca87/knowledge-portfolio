import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

//TODO: https://github.com/jpuri/react-draft-wysiwyg

export default function DraftEditor() {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	return <Editor editorState={editorState} onChange={setEditorState} />;
}

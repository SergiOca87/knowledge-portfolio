/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import dynamic from 'next/dynamic';
import React, { Component } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
	() => import('react-draft-wysiwyg').then((mod) => mod.Editor),
	{ ssr: false }
);

export default Editor;

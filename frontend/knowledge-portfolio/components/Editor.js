import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DynamicEditor = dynamic(
	() => import('react-draft-wysiwyg').then((mod) => mod.Editor),
	{ ssr: false, loading: () => <p>Loading...</p> }
);

export default function Editor() {
	return <DynamicEditor />;
}

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function SearchFilter({ filterByText }) {
	const [text, setText] = useState('');

	filterByText(text);

	return (
		<Form.Control
			type="text"
			placeholder="Search By Name"
			onChange={(e) => setText(e.target.value)}
		/>
	);
}

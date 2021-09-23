import React, { useState } from 'react';
import { DropdownButton, Form } from 'react-bootstrap';

export default function CategoryFilter({ categories, filterByCategory }) {
	const [chosenCategory, setChosenCategory] = useState(null);

	filterByCategory(chosenCategory);

	return (
		<Form.Select onChange={(e) => setChosenCategory(e.target.value)}>
			{categories.map((category) => {
				return <option value={category.name}>{category.name}</option>;
			})}
		</Form.Select>
	);
}

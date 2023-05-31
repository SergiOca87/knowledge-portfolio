import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import ToggleButton from 'react-bootstrap/ToggleButton';
import Category from './Category';

const StyledCategories = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	flex-wrap: wrap;
	align-items: center;
`;

const categoriesTitle = (categories) => {
	if (categories && categories.length === 0) {
		return;
	} else if (categories && categories.length > 1) {
		return <h5 className="secondary">Categories:</h5>;
	} else {
		return <h5 className="secondary">Category:</h5>;
	}
};

export default function Categories({
	categories,
	asButtons = false,
	title = true,
	background = false,
	editMode = false,
	activeCategories,
	setClickedCategories,
}) {
	return (
		<StyledCategories>
			{title ? categoriesTitle(categories) : ''}

			{categories.map((category) => {
				return (
					<Category
						key={category.id}
						category={category}
						background={background}
						asButtons={asButtons}
						editMode={editMode}
					/>
				);
			})}
		</StyledCategories>
	);
}

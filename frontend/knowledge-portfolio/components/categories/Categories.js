import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/fa';

const StyledCategories = styled.div`
	.categories {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.5rem;

		gap: 0.5rem;

		.category {
			font-size: 1.8rem;
			margin-right: 1rem;
		}

		div {
			display: flex;
			align-items: center;
			border: 1px solid var(--secondary);
			font-size: 1.2rem;
			text-transform: uppercase;
			padding: 0.8rem 1.5rem;
			letter-spacing: 1px;
			font-family: 'Montserrat-Medium';
		}
	}
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
	activeCategories,
	setClickedCategories,
}) {
	console.log('categories', categories);
	return (
		<StyledCategories>
			{title ? categoriesTitle(categories) : ''}

			{categories.map((category) => {
				let IconName = '';

				if (category.icon) {
					IconName = FontAwesome[category.icon];
				}

				return (
					<div className="categories">
						<div
							key={category.id}
							css={css`
								background-color: ${background
									? 'var(--secondary)'
									: 'transparent'};
							`}
						>
							{IconName && (
								<span className="category">
									<IconName />
								</span>
							)}

							<span>{category.name}</span>
						</div>
					</div>
				);
			})}
		</StyledCategories>
	);
}

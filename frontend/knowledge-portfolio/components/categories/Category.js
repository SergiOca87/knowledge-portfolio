import React from 'react';
import * as FontAwesome from 'react-icons/fa';
import ToggleButton from 'react-bootstrap/ToggleButton';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const StyledCategory = styled.div`
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
`;

function Category({
	category,
	background,
	asButtons,
	activeCategories,
	handleButtonClick,
}) {
	let IconName = '';

	if (category.icon) {
		IconName = FontAwesome[category.icon];
	}

	return asButtons ? (
		<Button
			size="sm"
			key={category.id}
			data-category={`${category.id}`}
			className={activeCategories?.includes(category.id) ? 'active' : ''}
			onClick={(e) => handleButtonClick(e.target)}
		>
			{IconName && (
				<span className="category">
					<IconName />
				</span>
			)}

			<span>{category.name}</span>
		</Button>
	) : (
		<StyledCategory>
			<div
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
		</StyledCategory>
	);
}

export default Category;

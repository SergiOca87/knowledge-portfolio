import React, { useState } from 'react';
import * as FontAwesome from 'react-icons/fa';
import ToggleButton from 'react-bootstrap/ToggleButton';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DeleteCategory from './DeleteCategory';

const StyledCategory = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 0.5rem;
	height: 4rem;
	position: relative;

	gap: 0.5rem;

	.category {
		font-size: 1.8rem;
		margin-right: 1rem;
		color: var(--text-color);
	}

	div {
		display: flex;
		align-items: center;
		border: 1px solid var(--secondary);
		font-size: 1.2rem;
		text-transform: uppercase;
		padding: 0.8rem 1.5rem;
		letter-spacing: 1px;
		font-family: 'KumbhSans-Bold';
		color: var(--text-color);
	}

	.delete-category {
		width: 15px;
		height: 13px;
		background-color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font-size: 2rem;
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
		text-align: center;
		border-radius: 1px;
	}
`;

const StyledCategoryButton = styled(Button)`
	padding: 0.5rem 1.6rem;
	height: 4rem;
	height: 4rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	

	span {
		font-size: 1.2rem;
	}

	svg {
		margin-top: -2px;
	}
`;

function Category({
	category,
	background,
	asButtons,
	activeCategories,
	editMode,
	handleButtonClick,
}) {
	// So that the user has to click twice to delete an Item
	// const [deleteConfirm, setDeleteConfirm] = useState({
	// 	counter: 0,
	// 	message: 'Delete',
	// });

	let IconName = '';

	if (category.icon) {
		IconName = FontAwesome[category.icon];
	}

	return asButtons ? (
		<>
			<StyledCategoryButton
				size="sm"
				variant="primary btn-outlined btn-small"
				key={category.id}
				data-category={`${category.id}`}
				data-categoryname={`${category.name}`}
				className={
					!!activeCategories?.find(
						(activeCategory) =>
							activeCategory.categoryId === category.id
					)
						? 'active'
						: ''
				}
				onClick={(e) => handleButtonClick(e.target)}
			>
				{IconName && (
					<span className="category">
						<IconName />
					</span>
				)}

				<span>{category.name}</span>
			</StyledCategoryButton>
		</>
	) : (
		<>
			<StyledCategory>
				<div
					css={css`
						background-color: ${background
							? 'var(--tertiary)'
							: 'transparent'};
					`}
				>
					{IconName && (
						<span className="category">
							<IconName />
						</span>
					)}

					<span>{category.name}</span>
					{editMode && <DeleteCategory categoryId={category.id} />}
				</div>
			</StyledCategory>
		</>
	);
}

export default Category;

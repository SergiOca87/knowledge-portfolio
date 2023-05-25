import React, { useState } from 'react';
import * as FontAwesome from 'react-icons/fa';
import ToggleButton from 'react-bootstrap/ToggleButton';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const StyledCategory = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 0.5rem;

	gap: 0.5rem;

	.category {
		font-size: 1.8rem;
		margin-right: 1rem;
		color: #fff;
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
		color: #fff;
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

	const deleteCategoryHandler = (id) => {
		const confirm = window.confirm('Are You Sure?');

		if (confirm) {
			console.log('delete category');
			try {
				fetch('/api/deleteCategory', {
					method: 'DELETE',
					body: JSON.stringify(id),
					headers: {
						'Content-Type': 'application-json',
					},
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.statusCode == 200) {
							toast.success(data.message);

							//TODO: Hide the category, maybe using refs?
						}
					});
			} catch (err) {
				toast.error(err);
			}
		}
	};

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
					{editMode && (
						<span
							className="delete-category"
							onClick={() => deleteCategoryHandler(category.id)}
						>
							&times;
						</span>
					)}
				</div>
			</StyledCategory>
		</>
	);
}

export default Category;

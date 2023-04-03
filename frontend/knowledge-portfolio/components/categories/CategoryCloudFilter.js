import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';
import Category from './Category';
import styled from 'styled-components';
// import { USER_CATEGORIES_QUERY, getCategories } from '../user/UserCategories';

const StyledCategoryCloudFilter = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
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

export default function CategoryCloudFilter({
	userCategories,
	activeCategories,
	setActiveCategories,
	all = false,
}) {
	const handleButtonClick = (target) => {
		// Handle a click outside of any button
		if (target.classList.contains('categories')) {
			return;
		}

		// If click is on svg or span, find the parent button
		const button = target.closest('.btn-primary');

		// Get the category id (number) stored in the data attr
		const clickedCategory = Number(button.dataset.category);

		if (activeCategories?.includes(clickedCategory)) {
			setActiveCategories(
				activeCategories.filter(
					(category) => category !== clickedCategory
				)
			);
		} else {
			setActiveCategories([...activeCategories, clickedCategory]);
		}
	};

	return (
		<>
			<StyledCategoryCloudFilter>
				{all && (
					<StyledCategoryButton
						size="sm"
						variant="outlined"
						className={
							activeCategories?.includes('All') ? 'active' : ''
						}
						data-category="All"
						onClick={(e) => setActiveCategories([])}
					>
						<span>All</span>
					</StyledCategoryButton>
				)}
				{userCategories?.map((category) => {
					let IconName = '';

					if (category.icon) {
						IconName = FontAwesome[category.icon];
					}
					return (
						<Category
							category={category}
							asButtons={true}
							activeCategories={activeCategories}
							handleButtonClick={handleButtonClick}
							key={category.name}
						/>
					);
				})}
			</StyledCategoryCloudFilter>
		</>
	);
}

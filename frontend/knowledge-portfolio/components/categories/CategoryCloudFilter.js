import React, { useContext, useEffect, useState } from 'react';
import UserContext, { useUserState } from '../../context/userContext';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';
// import { USER_CATEGORIES_QUERY, getCategories } from '../user/UserCategories';

export default function CategoryCloudFilter({
	activeCategories,
	setActiveCategories,
}) {
	const { userCategories } = useUserState();

	const handleButtonClick = (target) => {
		// Handle a click outside of any button
		if (target.classList.contains('categories')) {
			return;
		}

		// If click is on svg or span, find the parent button
		const button = target.closest('.btn-primary');

		// Get the category name stored in the data attr
		const clickedCategory = button.dataset.category;

		if (clickedCategory === 'All') {
			setActiveCategories([]);
		} else if (activeCategories?.includes(clickedCategory)) {
			// Deselect the category (button toggle), so remove it from the activeCategories
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
			<Button
				size="sm"
				className={activeCategories?.includes('All') ? 'active' : ''}
				data-category="All"
				onClick={(e) => handleButtonClick(e.target)}
			>
				<span>All</span>
			</Button>
			{userCategories?.map((category) => {
				let IconName = '';

				if (category.icon) {
					IconName = FontAwesome[category.icon];
				}
				return (
					<>
						<Button
							size="sm"
							key={category.id}
							data-category={`${category.name}`}
							className={
								activeCategories?.includes(category.name)
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
						</Button>
					</>
				);
			})}
		</>
	);
}

import React, { useContext, useEffect, useState } from 'react';
import UserContext, { useUserState } from '../../context/userContext';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';
import Category from './Category';
// import { USER_CATEGORIES_QUERY, getCategories } from '../user/UserCategories';

export default function CategoryCloudFilter({
	activeCategories,
	setActiveCategories,
	all = false,
}) {
	const { userCategories } = useUserState();

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

		console.log('active categories are...', activeCategories);
	};

	return (
		<>
			{all && (
				<Button
					size="sm"
					className={
						activeCategories?.includes('All') ? 'active' : ''
					}
					data-category="All"
					onClick={(e) => setActiveCategories([])}
				>
					<span>All</span>
				</Button>
			)}
			{userCategories?.map((category) => {
				let IconName = '';

				if (category.icon) {
					IconName = FontAwesome[category.icon];
				}
				return (
					<>
						<Category
							category={category}
							asButtons={true}
							activeCategories={activeCategories}
							handleButtonClick={handleButtonClick}
						/>
						{/* <Button
							size="sm"
							key={category.id}
							data-category={`${category.id}`}
							className={
								activeCategories?.includes(category.id)
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
						</Button> */}
					</>
				);
			})}
		</>
	);
}

import React, { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import Categories from './Categories';
import { USER_CATEGORIES_QUERY, getCategories } from '../user/UserCategories';

export default function CategoryCloudFilter({
	activeCategories,
	setActiveCategories,
	userId,
}) {
	const userCategories = getCategories(userId);

	//TODO: Handle the "All" case
	const handleButtonClick = (e) => {
		const button =
			e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
		const buttonCategory = button.dataset.category;
		const isAll = buttonCategory === 'All' ? true : false;

		if (isAll) {
			setActiveCategories(['All']);
		} else if (activeCategories.includes(buttonCategory)) {
			setActiveCategories(
				activeCategories.filter(
					(category) => category !== buttonCategory
				)
			);
		} else {
			if (activeCategories.includes('All')) {
				setActiveCategories(activeCategories.shift());
			}
			setActiveCategories([...activeCategories, buttonCategory]);
		}
	};

	return (
		<div
			onClick={(e) => {
				handleButtonClick(e);
			}}
		>
			{userCategories && (
				<Categories
					categories={userCategories.allCategories}
					asButtons={true}
					activeCategories={activeCategories}
				/>
			)}
		</div>
	);
}
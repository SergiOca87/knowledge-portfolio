/* eslint-disable react/react-in-jsx-scope */
//TODO: On the grid, description should be an excerpt
//TODO: The items should be user specific!

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import PortfolioOptionsContext from '../context/PortfolioOptionsContext';
import UserContext from '../context/UserContext';
import Item from './Item';

// Exported because it is reused (createItem) to refetch after successfull item creation
// export const ALL_ITEMS_QUERY = gql`
// 	query {
// 		allItems {
// 			id
// 			title
// 			description
// 			status
// 			category {
// 				id
// 				name
// 			}
// 		}
// 	}
// `;

//TODO: This query may be unnecessary, user already has items queried
//TODO: this Component may need some refactor when used in the public portfolio, maybe grab the id from the URL param
//TODO: Same with the user options.
// export const USER_ITEMS_QUERY = gql`
// 	query USER_ITEMS_QUERY($id: ID!) {
// 		User(where: { id: $id }) {
// 			options
// 			items {
// 				id
// 				title
// 				description
// 				status
// 				singlePageContent
// 				categories {
// 					id
// 					name
// 					icon
// 				}
// 			}
// 		}
// 	}
// `;

const StyledEmptyCard = styled.div`
	padding: 2rem;
	// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	background-color: var(--tertiary);

	margin-bottom: 1.5rem;
`;

export default function ItemGrid({
	user,
	isPublic,
	options,
	isPublicPage = false,
	chosenCategory,
	chosenText,
	activeCategories,
}) {
	//Number of items that are rendered
	const [visibleItems, setVisibleItems] = useState(0);

	const isAll = activeCategories?.includes('All') ? true : false;

	const itemsToRender = () => {
		if (isPublicPage && user.items && chosenText !== '' && !isAll) {
			return user.items.filter((item) => {
				return (
					item.title
						.toLowerCase()
						.includes(chosenText.toLowerCase()) &&
					activeCategories.every((activeCategory) => {
						if (
							item.categories.find(
								(itemCategory) =>
									itemCategory.name === activeCategory
							) !== undefined
						)
							return true;
					})
				);
			});
			// Else If there are user.items and the chosenCategory is not "All", undefined or null and chosenText is empty
		} else if (isPublicPage && user.items && chosenText === '' && !isAll) {
			return user.items.filter((item) => {
				return activeCategories.every((activeCategory) => {
					if (
						item.categories.find(
							(itemCategory) =>
								itemCategory.name === activeCategory
						) !== undefined
					)
						return true;
				});
			});
			// Else If there are user.items and the chosenCategory is "All", undefined or null and chosenText is not empty
		} else if (isPublicPage && user.items && chosenText !== '' && isAll) {
			return user.items.filter((item) =>
				item.title.toLowerCase().includes(chosenText.toLowerCase())
			);
			//Else return all items
		} else {
			return user.items;
		}
	};

	// On Page load, how many visible items are there?
	useEffect(() => {
		setVisibleItems(itemsToRender().length);
	}, []);

	// On filters change
	useEffect(() => {
		setVisibleItems(itemsToRender().length);
	}, [chosenCategory, chosenText, activeCategories]);

	return (
		<>
			{user && (
				<Row>
					{user.items &&
						itemsToRender().map((item, index) => {
							return (
								<>
									<Col
										lg={user?.options?.options?.cols}
										className="mb-4"
										key={item.id}
									>
										<Item item={item} isPublic={isPublic} />
									</Col>
									{console.log('index', index)}
								</>
							);
						})}

					{visibleItems <= 0 && (
						<h3>No results match your search criteria</h3>
					)}
					{!isPublicPage && (
						<Col lg={user?.options?.options?.cols}>
							<StyledEmptyCard>Add</StyledEmptyCard>
						</Col>
					)}
				</Row>
			)}
		</>
	);
}

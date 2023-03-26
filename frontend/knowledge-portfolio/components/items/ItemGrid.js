/* eslint-disable react/react-in-jsx-scope */
//TODO: On the grid, description should be an excerpt
//TODO: The items should be user specific!
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
// import { LOGGED_IN_USER } from './User';
import { Col, Row } from 'react-bootstrap';
import styled, { css } from 'styled-components';
// import PortfolioOptionsContext from '../context/PortfolioOptionsContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
// import NotLoggedIn from './NotLoggedIn';

const StyledItemGrid = styled.section`
	display: grid;
	list-style: none;
`;

const StyledEmptyCard = styled.div`
	padding: 2rem;
	// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	background-color: var(--tertiary);

	margin-bottom: 1.5rem;
`;

export default function ItemGrid({
	user,
	isPublic,
	// options,
	items,
	categories,
	isPublicPage = false,
	activeCategories,
	chosenText,
	// activeCategories,
}) {
	//Number of items that are rendered
	const [visibleItems, setVisibleItems] = useState(0);

	const [filteredItems, setFilteredItems] = useState([]);

	const [itemImage, setItemImage] = useState();

	const [hasBeenDeletedId, setHasBeenDeletedId] = useState([]);

	const [orderedItems, setOrderedItems] = useState([...items]);

	//TODO: Drag and Drop - does not work with filtered items, figure out
	const handleDrop = (droppedItem) => {
		// Dropped outside of the container
		if (!droppedItem.destination) return;

		let updatedList = [...orderedItems];

		// Remove dragged item
		const [reorderedItem] = updatedList.splice(droppedItem.source.index);

		// Add dropped item
		updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

		// Update State
		setOrderedItems(updatedList);
	};
	// const isAll = activeCategories?.includes('All') ? true : false;

	// const { options, setOptions } = useContext(PortfolioOptionsContext);

	// let sortedArray = [...user?.items];

	// Drag and Drop
	// const [itemsPosition, setItemsPosition] = useState();

	//TODO: This ordering needs to mutate the user options object (portfolioEdit)
	// const orderUserItemsArray = () => {
	// 	// Descending
	// 	if (user.options?.options?.ordering === 'ascending') {
	// 		sortedArray.reverse();
	// 	}

	// 	// alphabetical
	// 	if (user.options?.options?.ordering === 'alphabetical') {
	// 		sortedArray.sort((a, b) => a.title.localeCompare(b.title));
	// 	}

	// 	// Date
	// 	if (user.options?.options?.ordering === 'date') {
	// 		sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
	// 	}

	// 	//TODO, not working because well, this never mutates the user
	// 	if (user.options?.options?.ordering === 'drag') {
	// 		sortedArray = user.options?.options?.reorderedItems;
	// 	}

	// 	// if (user.options?.options?.ordering === 'drag') {
	// 	// 	handleOnDragEnd = (result) => {
	// 	// 		const [reorderedItem] = sortedArray.splice(
	// 	// 			result.source.index,
	// 	// 			1
	// 	// 		);
	// 	// 		sortedArray.splice(result.destination.index, 0, reorderedItem);
	// 	// 	};
	// 	// }

	// 	return sortedArray;
	// };

	// if (options.options.ordering === 'descending') {
	// 	console.log('ordering is descending');
	// 	user.items.reverse();
	// }

	// const itemsToRender = () => {
	// 	if (isPublicPage && user.items && chosenText !== '' && !isAll) {
	// 		return orderUserItemsArray().filter((item) => {
	// 			return (
	// 				item.title
	// 					.toLowerCase()
	// 					.includes(chosenText.toLowerCase()) &&
	// 				activeCategories.every((activeCategory) => {
	// 					if (
	// 						item.categories.find(
	// 							(itemCategory) =>
	// 								itemCategory.name === activeCategory
	// 						) !== undefined
	// 					)
	// 						return true;
	// 				})
	// 			);
	// 		});
	// 		// Else If there are user.items and the chosenCategory is not "All", undefined or null and chosenText is empty
	// 	} else if (isPublicPage && user.items && chosenText === '' && !isAll) {
	// 		return orderUserItemsArray().filter((item) => {
	// 			return activeCategories.every((activeCategory) => {
	// 				if (
	// 					item.categories.find(
	// 						(itemCategory) =>
	// 							itemCategory.name === activeCategory
	// 					) !== undefined
	// 				)
	// 					return true;
	// 			});
	// 		});
	// 		// Else If there are user.items and the chosenCategory is "All", undefined or null and chosenText is not empty
	// 	} else if (isPublicPage && user.items && chosenText !== '' && isAll) {
	// 		return orderUserItemsArray().filter((item) =>
	// 			item.title.toLowerCase().includes(chosenText.toLowerCase())
	// 		);
	// 		//Else return all items
	// 	} else {
	// 		return orderUserItemsArray();
	// 	}
	// };

	// On Page load, how many visible items are there?
	// useEffect(() => {
	// 	setVisibleItems(itemsToRender().length);
	// }, []);

	// // On filters change
	// useEffect(() => {
	// 	setVisibleItems(itemsToRender().length);
	// }, [chosenCategory, chosenText, activeCategories]);

	// On Page load, fill up the filteredItems Array with items
	// Filter the items if an item has been deleted (so that the item is hidden and we don't need to reload the page)

	//TODO: Resolve "Key (id)=(53) is still referenced from table "image"
	//TODO: Is this a bad use of useeffect?
	useEffect(() => {
		setFilteredItems(
			items.filter((item) => !hasBeenDeletedId.includes(item.id))
		);
	}, [hasBeenDeletedId]);

	//TODO: Why isn't this triggering are-render
	// const handleItemDelete = (id) => {
	// 	const shallowCopy = [...items];

	// 	const filteredCopy = shallowCopy.filter(
	// 		(item) => !hasBeenDeletedId.includes(id)
	// 	);

	// 	return setFilteredItems(filteredCopy);
	// };

	useEffect(() => {
		if (activeCategories.length === 0) {
			setFilteredItems(items);
		} else {
			setFilteredItems(
				items.filter(
					(item) =>
						item.categories !== null &&
						activeCategories.every((category) =>
							item.categories.includes(category)
						)
				)
			);
		}
	}, [activeCategories]);

	return (
		<>
			<DragDropContext onDragEnd={handleDrop}>
				<Droppable droppableId="list-container">
					{(provided) => (
						<StyledItemGrid
							css={css`
								grid-template-columns: repeat(2, 1fr);
								gap: 2rem;
							`}
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{filteredItems &&
								filteredItems.map((item, index) => {
									let itemCategories = '';

									// If the item has categories and they match a category ID from the user categories, pass it to the item
									// Maybe this logic should not be here in the Component
									if (
										item.categories &&
										item.categories.length
									) {
										itemCategories = categories.filter(
											(category) =>
												item.categories.includes(
													category.id
												)
										);
									}

									// if (images && images.length) {
									// 	setItemImage(
									// 		...images.filter(
									// 			(image) => image.item === item.id
									// 		)
									// 	);
									// }

									return (
										<Draggable
											key={`${item.name}-${item.id}`}
											draggableId={`${item.name}-${item.id}`}
											index={index}
										>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.dragHandleProps}
													{...provided.draggableProps}
												>
													<Item
														item={item}
														categories={
															itemCategories
														}
														isPublic={isPublic}
														setHasBeenDeletedId={
															setHasBeenDeletedId
														}
														hasBeenDeletedId={
															hasBeenDeletedId
														}
														key={`${item.name}-${item.id}`}
													/>
												</div>
											)}
										</Draggable>
									);
								})}

							{isPublicPage && items <= 0 && (
								<h3>No results match your search criteria</h3>
							)}

							{!isPublicPage && items.length === 0 && (
								<p>
									You can now start adding items to your
									portfolio or create a few categories first{' '}
									<Link href="/add-category">Here</Link>
								</p>
							)}

							{/* {!isPublicPage && (
							<li lg={user?.options?.options?.cols}>
								<StyledEmptyCard>Add</StyledEmptyCard>
							</li>
						)} */}
						</StyledItemGrid>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
}

import React, { useContext, useEffect, useState } from 'react';
import { Button, CloseButton, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import PortfolioOptionsContext from '../context/PortfolioOptionsContext';

const StyledListItem = styled.li`
	width: 100%;
	padding: 1rem 2rem;
	color: #000;
`;

export default function OrderingModal({
	itemList,
	openModal,
	setOpenModal,
	setReorderedItems,
}) {
	//TODO: We need to receive an itemList setter most likely to pass up the new order.

	const [show, setShow] = useState(false);
	const [draggedItems, setDraggedItems] = useState(null);
	const { options, setOptions } = useContext(PortfolioOptionsContext);

	useEffect(() => {
		if (user.options?.options?.reorderedItems.length) {
			setDraggedItems(user.options?.options?.reorderedItems);
		} else {
			setDraggedItems(itemList);
		}
	}, [itemList]);

	const handleOnDragEnd = (result) => {
		//If we dragged outside of droppable zone, return
		if (!result.destination) return;

		let sortedArray = Array.from(draggedItems);
		const [reorderedItem] = sortedArray.splice(result.source.index, 1);
		sortedArray.splice(result.destination.index, 0, reorderedItem);

		setDraggedItems(sortedArray);
	};

	//This function lifts the state up and set the itemList order
	const handleSaveOrder = () => {
		setReorderedItems(draggedItems);
		setShow(false);

		setOptions({
			...options,
			ordering: 'drag',
		});
	};

	//We need setOPenModal and openModal state lift because on the portfolio page we have another modal.
	// Otherwise they'd conflict and also the toggles are on "EditPortfolio" so state needs to traverse
	const handleClose = () => {
		setShow(false);
		setOpenModal(false);
	};

	useEffect(() => {
		if (openModal) {
			setShow(true);
			setOpenModal(true);
		}
	}, [openModal, setOpenModal]);

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DragDropContext
						// onDragStart={handleOnDragStart}
						onDragEnd={handleOnDragEnd}
					>
						<Droppable droppableId="items">
							{(provided) => (
								<ul
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{draggedItems.map((item, index) => {
										return (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided) => (
													<StyledListItem
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
													>
														{item.title}
													</StyledListItem>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</ul>
							)}
						</Droppable>
					</DragDropContext>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button onClick={handleSaveOrder} variant="primary">
						Save Order
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

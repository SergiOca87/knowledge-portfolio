import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DeleteItem from './DeleteItem';
import {
	Button,
	Card,
	ListGroup,
	ListGroupItem,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import Categories from '../categories/Categories';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import TooltipButton from '../ui/TooltipButton';

const StyledCard = styled(Card)`
	.list-group-item {
		&:not(:last-child) {
			margin-bottom: 2rem;
		}
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
	}
`;

const StyledButtons = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	z-index: 0;
	position: relative;
	transition: all 300ms;

	div {
		&:first-child {
			button {
				border-left: 1px solid var(--secondary);
			}
		}
	}

	button {
		width: 7rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		transition: all 300ms;
		cursor: pointer;
		padding: 0;
		border-bottom: transparent !important;
		border-right: 1px solid var(--primary);
		border-top: 4px solid var(--primary);
		border-radius: 0;
		margin-left -1px;
		color: #fff;
		z-index: 10;

		svg {
			transition: all 300ms;
			margin-top: -3px;
		}

		a {
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
		}

		&:hover,
		&:active,
		&:focus {
			border-bottom: transparent !important;
			border-right: 1px solid var(--secondary);
			border-top: 4px solid var(--secondary);
			background-color: var(--secondary);

			svg {
				stroke: var(--black);
				fill: var(--black);
			}
		}
	}
`;

export default function Item({
	item,
	categories,
	isPublic,
	setHasBeenDeletedId,
	hasBeenDeletedId,
}) {
	return (
		<StyledCard className={item.id}>
			<Card.Header as="h4" className="mb-3">
				{item.title}

				{item.date && <p>{item.date}</p>}
			</Card.Header>

			<Card.Body>
				{item.mainImageUrl && (
					<Image
						src={item.mainImageUrl}
						width="300"
						height="300"
						alt={item.mainImageName}
					/>
				)}
				<ListGroup className="list-group-flush">
					{item.description && (
						<ListGroupItem>
							<h5 className="secondary">Description:</h5>
							<p>{item.description}</p>
							{/* <p>{item.mainImage?.publicUrl}</p> */}
						</ListGroupItem>
					)}

					{item.status && (
						<ListGroupItem>
							<h5 className="secondary">Status:</h5>
							<p
								css={css`
									text-transform: capitalize;
								`}
							>
								{item.status}
							</p>
						</ListGroupItem>
					)}

					{categories && (
						<ListGroupItem>
							<Categories
								title={false}
								categories={categories}
								background={true}
							/>
						</ListGroupItem>
					)}

					{item.singlePageContent && (
						<ListGroupItem>
							<Link href={`/items/${item.id}`}>
								<Button variant="transparent-secondary">
									More Details
								</Button>
							</Link>
						</ListGroupItem>
					)}
				</ListGroup>
			</Card.Body>
			{!isPublic && (
				<StyledButtons>
					<TooltipButton
						tooltipText="Edit Portfolio Item"
						link={`/update/${item.id}`}
						icon={<FaPencilAlt />}
					/>

					<OverlayTrigger
						placement={'top'}
						overlay={
							<Tooltip id={`tooltip-top}`}>
								Delete Portfolio Item
							</Tooltip>
						}
					>
						<Button variant="secondary">
							<DeleteItem
								id={item.id}
								setHasBeenDeletedId={setHasBeenDeletedId}
								hasBeenDeletedId={hasBeenDeletedId}
								className="btn"
							>
								{' '}
								<FaTrashAlt />
							</DeleteItem>
						</Button>
					</OverlayTrigger>
				</StyledButtons>
			)}
		</StyledCard>
	);
}

import styled, { css } from 'styled-components';
import React, { memo } from 'react';
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
	width: 100%;
	max-width: 65rem;
	min-height: 30rem;
	margin: 0 auto 4rem auto;

	.list-group-item {
		&:not(:last-child) {
			margin-bottom: 2rem;
		}
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
	}

	&.hidden {
		filter: grayscale(1);
		opacity: 0.5;
		cursor: no-drop !important;
		pointer-events: none !important;
	}

	p {
		font-size: 1.6rem;
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
				border-left: 1px solid var(--primary);
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
			stroke: var(--primary);
			fill: var(--primary);
			
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
const Item = ({ item, categories, isPublic }) => {
	const itemCategories = categories.filter((category) =>
		item.categories.includes(category.id)
	);

	console.log('single item rendering');
	return (
		<StyledCard>
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

					<ListGroupItem>
						<h5 className="secondary">Status:</h5>
						<p
							css={css`
								text-transform: capitalize;
							`}
						>
							{item.status === true ? 'Finished' : 'Unfinished'}
						</p>
					</ListGroupItem>

					{item.categories && (
						<ListGroupItem>
							<h5 className="secondary">Categories:</h5>
							<Categories
								title={false}
								categories={itemCategories}
								background={true}
							/>
						</ListGroupItem>
					)}

					{item.singlePageContent && (
						<ListGroupItem>
							<Link href={`/items/${item.id}`}>
								<Button variant="outlined" type="button">
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
							<DeleteItem id={item.id} className="btn">
								{' '}
								<FaTrashAlt />
							</DeleteItem>
						</Button>
					</OverlayTrigger>
				</StyledButtons>
			)}
		</StyledCard>
	);
};

export default memo(Item);

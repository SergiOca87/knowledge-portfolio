import styled, { css } from 'styled-components';
import React from 'react';
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Categories from '../categories/Categories';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

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

//TODO: Add Date
export default function Item({ item, isPublic }) {
	return (
		<StyledCard>
			<Card.Header as="h4" className="mb-3">
				{item.title}
				{item.date && <p>{item.date}</p>}
			</Card.Header>
			{/* <Card.Body>
				<ListGroup className="list-group-flush">
					{item.description && (
						<ListGroupItem>
							<h5 className="secondary">Description:</h5>
							<p>{item.description}</p>
							<p>{item.mainImage?.publicUrl}</p>
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

					{item.categories.length && (
						<ListGroupItem>
							<Categories categories={item?.categories} />
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
			</Card.Body> */}
			{/* {!isPublic && (
				<div className="buttons">
					<Link
						href={{
							pathname: '/update',
							query: {
								id: item.id,
							},
						}}
					>
						<Button variant="secondary">
							<FaPencilAlt />
						</Button>
					</Link>
					<DeleteItem id={item.id} className="btn">
						{' '}
						<FaTrashAlt />
					</DeleteItem>
				</div>
			)} */}
		</StyledCard>
	);
}

import styled, { css } from 'styled-components';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
export default function Item({ item, categories, isPublic }) {
	return (
		<StyledCard className={item.id}>
			<Card.Header as="h4" className="mb-3">
				<h3>{item.title}</h3>

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
				<div className="buttons">
					<Link
						href={{
							pathname: `/update/${item.id}`,
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
			)}
		</StyledCard>
	);
}

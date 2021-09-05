import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import DeleteItem from './DeleteItem';

const StyledItem = styled.div`
	// padding: 2rem;
	// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	background-color: var(--tertiary);
	margin-bottom: 1.5rem;

	.title {
		padding: 2rem;
		background-color: var(--secondary);

		h4 {
			margin: 0;
			color: var(--primary);
			font-family: 'Montserrat-Medium';
			font-size: 2.2rem;
		}
	}

	.details {
		padding: 2rem;
	}
`;

// The Item is the knowledge block
// Title
// Description
// Date
// image?
// Category (relationship)
// Url
// Completed?

export default function Item({ item }) {
	return (
		<StyledItem>
			<div className="title">
				<h4>{item.title}</h4>
			</div>
			<div className="details">
				<p>{item.description}</p>
				<p>Status: {item.status}</p>
				<p>Category: {item.category.name}</p>
				{/* <div class="categories">
				{item.category.map((singleCategory) => {
					return (
						<p key={singleCategory.id}>{singleCategory.name}</p>
					);
				})}
			</div> */}
				<Link href={`/items/${item.id}`}>More Details</Link>
				//TODO: Is the owner of the item and is private page? Show
				<div className="buttons">
					<Link
						href={{
							pathname: 'update',
							query: {
								id: item.id,
							},
						}}
					>
						Edit Item
					</Link>
					<DeleteItem id={item.id}>Delete Item</DeleteItem>
				</div>
			</div>
		</StyledItem>
	);
}

import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import DeleteItem from './DeleteItem';

const StyledItem = styled.div`
	padding: 2rem;
	border-radius: 8px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
			<h4>{item.title}</h4>
			<p>{item.description}</p>
			<p>Status: {item.status}</p>
			<div class="categories">
				{item.categories.map((category) => {
					return (
						//TODO: Each category should be a link to a page with posts from that category
						<p key={category.id}>{category.name}</p>
					);
				})}
			</div>
			<Link href={`/items/${item.id}`}>More Details</Link>
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
				<p>{item.id}</p>
			</div>
		</StyledItem>
	);
}

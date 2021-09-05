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

		.categories {
			display: flex;
			flex-wrap: wrap;

			div {
				border: 1px solid var(--secondary);
				font-size: 1.2rem;
				text-transform: uppercase;
				padding: 0.8rem 1.5rem;
				letter-spacing: 1px;
				font-family: 'Montserrat-Medium';
				margin-right: 0.5rem;
			}
		}
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
	console.log(item);
	return (
		<StyledItem>
			<div className="title">
				<h4>{item.title}</h4>
			</div>
			<div className="details">
				<p>{item.description}</p>
				<p>Status: {item.status}</p>
				{/* <p>Category: {item.category.name}</p> */}
				{item.categories.length ? (
					<>
						<p>
							{item.categories.length > 1
								? 'Categories'
								: 'Category'}
						</p>
						<div class="categories">
							{item.categories.map((category) => {
								return (
									<div key={category.id}>
										<span>{category.name}</span>
									</div>
								);
							})}
						</div>
					</>
				) : (
					''
				)}
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
				</div>
			</div>
		</StyledItem>
	);
}

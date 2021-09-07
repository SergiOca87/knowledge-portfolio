import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';

const StyledItem = styled.div`
	height: 100%;
	background-color: var(--tertiary);
	display: flex;
	flex-direction: column;

	.title {
		padding: 2rem;
		background-color: var(--tertiary);
		border-bottom: 1px solid var(--secondary);

		h4 {
			margin: 0;
			color: var(--primary);
			color: #fff;
			font-family: 'Montserrat-Medium';
			font-size: 2.2rem;
		}
	}

	.buttons {
		display: flex;
		padding: 2rem;
		margin-top: auto;
		background-color: var(--primary);

		.btn {
			margin-right: 0.5rem;
		}
	}

	.details {
		padding: 2rem;

		.separator {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 2rem 0;
			align-items: flex-start;

			&:not(:last-child) {
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			}

			h5 {
				text-transform: uppercase;
				letter-spacing: 1px;
				margin-bottom: 0.5rem;
				color: var(--secondary);
			}

			p {
				margin: 0;
			}
		}

		.categories {
			display: flex;
			flex-wrap: wrap;
			margin-top: 0.5rem;

			.category {
				font-size: 1.8rem;
				margin-right: 1rem;
			}

			div {
				display: flex;
				align-items: center;
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
	console.log('item', item);
	return (
		<StyledItem>
			<div className="title">
				<h4>{item.title}</h4>
			</div>
			<div className="details">
				<div className="separator">
					<h5>Description:</h5>
					<p>{item.description}</p>
				</div>

				<div className="separator">
					<h5>Status:</h5>
					<p
						css={css`
							text-transform: capitalize;
						`}
					>
						{item.status}
					</p>
				</div>
				{/* <p>Category: {item.category.name}</p> */}
				{item.categories.length ? (
					<div className="separator">
						<h5>
							{item.categories.length > 1
								? 'Categories:'
								: 'Category:'}
						</h5>
						<div className="categories">
							{item.categories.map((category) => {
								console.log('category', category);
								let IconName = '';

								if (category.icon) {
									IconName = FontAwesome[category.icon];
								}

								return (
									<div key={category.id}>
										{IconName && (
											<span className="category">
												<IconName />
											</span>
										)}
										<span>{category.name}</span>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					''
				)}
				<div className="separator">
					<Link href={`/items/${item.id}`}>
						<Button variant="transparent-secondary">
							More Details
						</Button>
					</Link>
				</div>
			</div>
			<div className="buttons">
				<Link
					href={{
						pathname: '/update',
						query: {
							id: item.id,
						},
					}}
				>
					<Button variant="secondary">Edit Item</Button>
				</Link>
				<DeleteItem id={item.id} className="btn">
					{' '}
					Delete Item
				</DeleteItem>
			</div>
		</StyledItem>
	);
}

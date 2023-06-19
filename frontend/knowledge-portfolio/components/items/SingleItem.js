/* eslint-disable react/react-in-jsx-scope */
//TODO: Add a "back to all items"
//TODO: Add the rest of the fields to the single item component
import styled from 'styled-components';
import Head from 'next/head';
import Layout from '../layout/Layout';
import Categories from '../categories/Categories';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

const StyledSingleItem = styled(Card)`
	background-color: var(--tertiary);
	padding: 4rem 6rem;
	height: 100%;
	max-width: 95rem;
	margin: 0 auto;

	@media screen and (max-width: 767px) {
		padding: 2rem;
	}

	h1 {
		font-size: 4rem;
		margin-bottom: 3rem;
	}

	.meta {
		margin-bottom: 3rem;
	}

	.content {
		padding: 2rem 0;

		p,
		li,
		span {
			color: #fff;
			font-size: 1.8rem;
			background-color: transparent;
		}
	}

	iframe,
	img {
		width: 100% !important;
	}
`;

export default function SingleItem({ item, categories }) {
	// if (loading) return <p>Loading...</p>;
	const singleItem = item[0];

	const markup = singleItem.singlePageContent
		? draftToHtml(JSON.parse(singleItem.singlePageContent))
		: '';

	return (
		<>
			<StyledSingleItem>
				<h1>{singleItem.title}</h1>
				<div className="meta">
					<p>
						By:{' '}
						<Link href={`/public-portfolio/${singleItem.userId}`}>
							{singleItem.userAlias ||
								(singleItem.userName && (
									<p>
										By:{' '}
										{singleItem.userAlias
											? singleItem.userAlias
											: singleItem.userName}
									</p>
								))}
						</Link>
					</p>

					{categories && (
						<Categories categories={categories} background={true} />
					)}
				</div>
				<hr />
				<div className="content">
					{singleItem.singlePageContent &&
						console.log(JSON.parse(singleItem.singlePageContent))}
					{parse(`${markup}`)}
				</div>
			</StyledSingleItem>
		</>
	);
}

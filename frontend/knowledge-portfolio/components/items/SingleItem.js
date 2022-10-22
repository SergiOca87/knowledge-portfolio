/* eslint-disable react/react-in-jsx-scope */
//TODO: Add a "back to all items"
//TODO: Add the rest of the fields to the single item component

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';
import Layout from '../Layout';
import Categories from './Categories';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';

const StyledSingleItem = styled.div`
	background-color: var(--tertiary);
	padding: 4rem 2rem;
	height: 100%;

	.content {
		max-width: 80rem;
		margin: 0 auto;
		padding: 2rem 0;
	}

	iframe,
	img {
		width: 100% !important;
	}

	p,
	li,
	span {
		color: #fff;
		font-size: 1.8rem;
		background-color: transparent;
	}
`;

// const SINGLE_ITEM_QUERY = gql`
// 	query SINGLE_ITEM_QUERY($id: ID!) {
// 		Item(where: { id: $id }) {
// 			title
// 			description
// 			status
// 			singlePageContent
// 			author {
// 				name
// 				# image
// 			}
// 			categories {
// 				id
// 				name
// 				icon
// 			}
// 		}
// 	}
// `;

export default function SingleItem({ id }) {
	// const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
	// 	variables: {
	// 		id,
	// 	},
	// });

	// if (loading) return <p>Loading...</p>;

	//TODO: Toast
	// if (error) return <p>error {error.message}</p>;

	// const markup = draftToHtml(JSON.parse(data.Item.singlePageContent));

	return (
		<>
			<StyledSingleItem>
				<h1>{data.Item.title}</h1>
				<div className="meta">
					<p>By: {data.Item.author.name}</p>
					{data.Item.categories && (
						<Categories categories={data.Item.categories} />
					)}
				</div>
				<hr />
				<div className="content">
					{console.log(JSON.parse(data.Item.singlePageContent))}
					{parse(`${markup}`)}
				</div>
			</StyledSingleItem>
		</>
	);
}

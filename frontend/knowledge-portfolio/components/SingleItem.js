//TODO: Add a "back to all items"
//TODO: Add the rest of the fields to the single item component

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';
import Layout from './Layout';

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		Item(where: { id: $id }) {
			title
			description
			status
			categories {
				id
				name
			}
		}
	}
`;

export default function SingleItem({ id }) {
	const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
		variables: {
			id,
		},
	});

	if (loading) return <p>Loading...</p>;

	//TODO: Toast
	if (error) return <p>error {error.message}</p>;

	console.log(data);

	return (
		<>
			<Layout>
				<p>Single item Component</p>
				<div>
					<p>{data.Item.title}</p>
				</div>
			</Layout>
		</>
	);
}

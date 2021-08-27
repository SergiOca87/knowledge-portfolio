//TODO: Add a "back to all items"
//TODO: Add the rest of the fields to the single item component

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';
import Layout from './Layout';
import { useUser } from './User';

const SINGLE_CATEGORY_QUERY = gql`
	query SINGLE_CATEGORY_QUERY($id: ID!) {
		Category(where: { id: $id }) {
			name
			items {
				title
			}
		}
	}
`;

export default function SingleCategory({ id }) {
	const user = useUser();

	const { data, loading, error } = useQuery(SINGLE_CATEGORY_QUERY, {
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
				<h1>
					{user.name}'s {data.Category.name} Category.
				</h1>
				<div>
					<p>
						These are all items from the {data.Category.name}{' '}
						Category:
					</p>
					{data.Category.items.map((item) => {
						return (
							<div>
								<p>(item card)</p>
								<p>{item.title}</p>
							</div>
						);
					})}
				</div>
			</Layout>
		</>
	);
}

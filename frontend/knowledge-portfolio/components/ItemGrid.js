/* eslint-disable react/react-in-jsx-scope */
//TODO: On the grid, description should be an excerpt
//TODO: The items should be user specific!

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Item from './Item';

// Exported because it is reused (createItem) to refetch after successfull item creation
// export const ALL_ITEMS_QUERY = gql`
// 	query {
// 		allItems {
// 			id
// 			title
// 			description
// 			status
// 			category {
// 				id
// 				name
// 			}
// 		}
// 	}
// `;

export const USER_ITEMS_QUERY = gql`
	query USER_ITEMS_QUERY($id: ID!) {
		User(where: { id: $id }) {
			items {
				id
				title
				description
				status
				categories {
					id
					name
				}
			}
		}
	}
`;

const StyledEmptyCard = styled.div`
	padding: 2rem;
	// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	background-color: var(--tertiary);

	margin-bottom: 1.5rem;
`;

export default function ItemGrid({ id }) {
	const { data, loading, error } = useQuery(USER_ITEMS_QUERY, {
		variables: { id },
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>There was a problem, {error.message}</p>;
	} else {
		return (
			<Row>
				{data.User.items.map((item) => {
					console.log('itemGrid', item);
					return (
						<Col lg={6} className="mb-4">
							<Item key={item.id} item={item} />
						</Col>
					);
				})}
				<Col lg={6}>
					<StyledEmptyCard>Add</StyledEmptyCard>
				</Col>
			</Row>
		);
	}
}

/* eslint-disable react/react-in-jsx-scope */
//TODO: On the grid, description should be an excerpt
//TODO: The items should be user specific!

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import PortfolioOptionsContext from '../context/PortfolioOptionsContext';
import UserContext from '../context/UserContext';
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

//TODO: This query may be unnecessary, user already has items queried
//TODO: this Component may need some refactor when used in the public portfolio, maybe grab the id from the URL param
//TODO: Same with the user options.
// export const USER_ITEMS_QUERY = gql`
// 	query USER_ITEMS_QUERY($id: ID!) {
// 		User(where: { id: $id }) {
// 			options
// 			items {
// 				id
// 				title
// 				description
// 				status
// 				singlePageContent
// 				categories {
// 					id
// 					name
// 					icon
// 				}
// 			}
// 		}
// 	}
// `;

const StyledEmptyCard = styled.div`
	padding: 2rem;
	// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	background-color: var(--tertiary);

	margin-bottom: 1.5rem;
`;

export default function ItemGrid({
	user,
	isPublic,
	options,
	isPublicPage = false,
	chosenCategory,
}) {
	//TODO: Filter by ChosenCategory
	return (
		<>
			{user && (
				<Row>
					{user.items &&
						user.items?.map((item) => {
							return (
								<Col
									lg={user?.options?.options?.cols}
									className="mb-4"
									key={item.id}
								>
									<Item item={item} isPublic={isPublic} />
								</Col>
							);
						})}

					{!isPublicPage && (
						<Col lg={user?.options?.options?.cols}>
							<StyledEmptyCard>Add</StyledEmptyCard>
						</Col>
					)}
				</Row>
			)}
		</>
	);
}

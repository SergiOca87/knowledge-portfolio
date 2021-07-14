import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

const StyledItemGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 40px;
`;

export const ALL_ITEMS_QUERY = gql`
	query ALL_ITEMS_QUERY {
		allItems {
			id
			title
			# description
			# category
			# url
			# user
			# completed
		}
	}
`;

export default function ItemGrid() {
	const { data, loading, error } = useQuery(ALL_ITEMS_QUERY);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>There was a problem, {error.message}</p>;
	} else {
		return (
			<StyledItemGrid>
				{data.allItems.map((item) => {
					return <Item key={item.id} item={item} />;
				})}
			</StyledItemGrid>
		);
	}
}

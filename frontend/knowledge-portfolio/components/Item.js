import styled from 'styled-components';

const StyledItem = styled.div``;

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
			<p>{item.title}</p>
		</StyledItem>
	);
}

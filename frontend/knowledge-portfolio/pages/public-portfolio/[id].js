import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';

const StyledUserCard = styled.div`
	margin-bottom: 6rem;
	.flex-wrap {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 10rem;
		height: 10rem;
		background-color: var(--tertiary);
		border-radius: 50%;
		border: 2px solid var(--secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		margin-right: 4rem;
		flex-shrink: 0;
	}
	h1 {
		font-size: 4rem;
	}
`;

const StyledGridWrap = styled.div`
	border-top: 1px solid var(--secondary);
	padding-top: 4rem;
	z-index: 10;
	position: relative;
`;

const UserControls = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	z-index: 0;
	position: relative;
	transition: all 300ms;

	div {
		&:first-child {
			button {
				border-right: 1px solid var(--secondary);
				border-left: 1px solid transparent;
			}
		}

		&:last-child {
			button {
				border-left: 1px solid var(--secondary);
				border-right: 1px solid transparent;
			}
		}
	}

	button {
		width: 7rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--tertiary);
		transition: all 300ms;
		cursor: pointer;
		border-top: 5px solid transparent !important;
		border-bottom: transparent !important;
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;

		svg {
			transition: all 300ms;
			margin-top: -3px;
		}

		&:hover,
		&:active,
		&:focus {
			border-top: 5px solid var(--secondary) !important;
			background-color: var(--tertiary);
			border-color: none !important;

			svg {
				stroke: var(--secondary);
				fill: var(--secondary);
			}
		}
	}
`;

//TODO Get the user for the name as well

export default function UserPortfolioPage(items, categories) {
	{
		console.log(items, categories);
	}
}

export async function getServerSideProps(context) {
	// Get params from URL
	const { params } = context;

	// Get User ID
	const userId = params.id;

	// Fetch items related to that ID (foreign key relationship)
	// This is ok here, does not need t be an API call:
	//It can be tempting to reach for an API Route when you want to fetch data from the server, then call that API route from getServerSideProps.
	// This is an unnecessary and inefficient approach, as it will cause an extra request to be made due to both getServerSideProps and API Routes running on the server.
	let { data: items } = await supabase
		.from('items')
		.select('*')
		.eq('userId', userId);

	// Store existing category ids on items and flatten the array into a sigle Array
	// Not necessary anymore
	// const categoryIds = items.map((item) => item.categories).flat();

	// Fetch User categories
	let { data: categories } = await supabase
		.from('categories')
		.select('*')
		.eq('userId', userId);

	return {
		props: {
			items,
			categories,
		},
	};
}

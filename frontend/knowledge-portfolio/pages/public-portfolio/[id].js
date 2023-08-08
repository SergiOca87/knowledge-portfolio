import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { Container } from 'react-bootstrap';
import Main from '../../components/layout/Main';
import CategoryCloudFilter from '../../components/categories/CategoryCloudFilter';

import { ListManager } from 'react-beautiful-dnd-grid';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Item from '../../components/items/Item';
import { useEffect, useState } from 'react';
import { FaExclamation } from 'react-icons/fa';

const StyledUserCard = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 6rem;

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
		font-size: 3.5rem;
		margin: 2rem 0 5rem 0;
	}
`;

const StyledGridWrap = styled.div`
	border-top: 1px solid var(--secondary);
	padding-top: 4rem;
	z-index: 10;
	position: relative;
`;

const StyledNotice = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	margin-top: 2rem;

	svg {
		fill: var(--primary);
	}

	p {
		margin: 0;
	}
`;

const StyledItemsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

//TODO Get the user for the name as well

export default function UserPortfolioPage({
	items,
	categories,
	userName,
	profiles,
}) {
	//TODO: We get the profile but the user would need to set up a name
	{
		console.log(profiles);
	}

	//TODO: This is repeated on Portfolio
	const [activeCategories, setActiveCategories] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		setFilteredItems(
			activeCategories.length === 0
				? items
				: items.filter(
						(item) =>
							item.categories === null ||
							item.categories.length === 0 || // Include items with no categories
							(item.categories !== null &&
								activeCategories.every((category) =>
									item.categories.includes(
										category.categoryId
									)
								))
				  )
		);
	}, [activeCategories, items]);

	return (
		<Main>
			{userName && (
				<Container>
					<StyledUserCard>
						<h1>
							<span className="secondary">{userName}'s</span>
							<br />
							Knowledge Portfolio
						</h1>
					</StyledUserCard>
				</Container>
			)}

			<StyledGridWrap>
				<Container>
					{categories && (
						<>
							<p>Filter By Category:</p>
							<CategoryCloudFilter
								activeCategories={activeCategories}
								setActiveCategories={setActiveCategories}
								userCategories={categories}
								all={true}
							/>
						</>
					)}

					{filteredItems.length ? (
						<StyledItemsGrid>
							{filteredItems.map((item) => {
								return (
									<Item
										item={item}
										categories={categories}
										isPublic={true}
									/>
								);
							})}
						</StyledItemsGrid>
					) : (
						<StyledNotice>
							<FaExclamation />{' '}
							<p>This Portfolio has no items yet.</p>
						</StyledNotice>
					)}
				</Container>
			</StyledGridWrap>
		</Main>
	);
}

export async function getServerSideProps(context) {
	const supabase = createServerSupabaseClient(context);

	// Get params from URL
	const { params, query } = context;

	// Get User ID
	const userId = params.id;

	const userName = context.query.name;
	// const userName = context.query.name;

	let { data: profiles } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userId);

	// const { data: user, error: userError } = await supabase
	// 	.from('profiles')
	// 	.select('*')
	// 	.eq('userId', userId);
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
			profiles,
			userName,
			items,
			categories,
		},
	};
}

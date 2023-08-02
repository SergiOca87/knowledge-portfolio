import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

// import ItemGrid from '../components/items/_ItemGrid';
import CategoryCloudFilter from '../components/categories/CategoryCloudFilter';
import Main from '../components/layout/Main';

import NotLoggedIn from '../components/auth/NotLoggedIn';
// import { supabase } from '../utils/supabaseClient';
import PortfolioControls from '../components/ui/PortfolioControls';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ListManager } from 'react-beautiful-dnd-grid';
import Item from '../components/items/Item';
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';

const StyledListManager = styled.div`
	margin-top: 6rem;

	& > div {
		gap: 2rem;
		align-items: stretch !important;
		flex-wrap: wrap;

		& > div {
			width: 100%;
			flex: 1;
			min-height: 100%;
			margin-top: 2rem;
		}
	}
`;

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
	border-top: 1px solid var(--primary);
	padding: 6rem 2rem 2rem 2rem;
	z-index: 10;
	position: relative;
	background-color: var(--grey);
`;

export default function UserPortfolioPage({ user, items, categories }) {
	const [activeCategories, setActiveCategories] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [order, setOrder] = useState(filteredItems);
	const [{ data, error }, apiInteraction] = useApi();

	//TODO: Can't manage to refresh List Manager when hasBeenDeletedId changes...

	// Data changes by the useApi hook
	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const reorderList = (sourceIndex, destinationIndex) => {
		if (destinationIndex === sourceIndex) {
			return;
		}

		const newItems = Array.from(filteredItems);
		const [movingItem] = newItems.splice(sourceIndex, 1);
		newItems.splice(destinationIndex, 0, movingItem);

		const updatedItems = newItems.map((item, index) => ({
			...item,
			order: index,
		}));

		setFilteredItems(updatedItems);

		// Order is just an Array of ids with the new order, not sure if it's needed yet
		setOrder(updatedItems.map((item) => item.id));

		//Set the new updated items order to the database and reorder them there as well.
		apiInteraction('/api/reorderItems', 'PUT', updatedItems);
	};

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
			{user ? (
				<>
					<Container>
						<StyledUserCard>
							<h1>
								Welcome to your portfolio,
								<br />
								<span className="secondary">
									{user?.user_metadata.name
										? user.user_metadata.name
										: user.email}
								</span>
							</h1>
						</StyledUserCard>
						<PortfolioControls user={user} />
					</Container>

					<StyledGridWrap>
						<Container>
							{activeCategories && (
								<>
									<p>Filter By Category:</p>
									<CategoryCloudFilter
										activeCategories={activeCategories}
										setActiveCategories={
											setActiveCategories
										}
										userCategories={categories}
										all={true}
									/>
								</>
							)}
							<StyledListManager>
								<ListManager
									items={filteredItems}
									direction="horizontal"
									maxItems={2}
									render={(item) => (
										<Item
											item={item}
											categories={categories}
										/>
									)}
									onDragEnd={reorderList}
								/>
							</StyledListManager>
						</Container>
					</StyledGridWrap>
				</>
			) : (
				<Container>
					<NotLoggedIn />
				</Container>
			)}
		</Main>
	);
}

export async function getServerSideProps(context) {
	const supabase = createServerSupabaseClient(context);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const { data: items } = await supabase
		.from('items')
		.select('*')
		.eq('userId', session.user.id)
		.order('order', { ascending: true });

	const { data: categories } = await supabase
		.from('categories')
		.select('*')
		.eq('userId', session.user.id);

	return {
		props: {
			initialSession: session,
			user: session.user,
			items,
			categories,
		},
	};
}

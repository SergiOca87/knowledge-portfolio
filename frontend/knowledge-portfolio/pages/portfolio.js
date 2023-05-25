import React, { useContext, useEffect, useRef, useState } from 'react';
import { Router, useRouter } from 'next/router';
import styled from 'styled-components';
import {
	Container,
	Row,
	Col,
	Button,
	Modal,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';

import { useSessionContext } from '@supabase/auth-helpers-react';

import {
	FaUser,
	FaPlus,
	FaEye,
	FaPencilAlt,
	FaFileDownload,
	FaQrcode,
} from 'react-icons/fa';
import Link from 'next/link';

// import ItemGrid from '../components/items/_ItemGrid';
import CategoryCloudFilter from '../components/categories/CategoryCloudFilter';
import Main from '../components/layout/Main';
// import PortfolioEdit from '../components/PortfolioEdit';
// import PortfolioOptionsContext, {
// 	OptionsProvider,
// } from '../context/PortfolioOptionsContext';
import UserStyleOptions from '../components/user/UserStyleOptions';
// import OrderingModal from '../components/OrderingModal';
// import { LOGGED_IN_USER } from '../components/User';
import QrModal from '../components/QrModal';
import UserContext, { useUserState } from '../context/userContext';
import NotLoggedIn from '../components/auth/NotLoggedIn';
// import { supabase } from '../utils/supabaseClient';
import PortfolioControls from '../components/ui/PortfolioControls';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ListManager } from 'react-beautiful-dnd-grid';
import Item from '../components/items/Item';

const StyledListManager = styled.div`
	& > div {
		gap: 2rem;
		align-items: stretch !important;

		& > div {
			width: 100%;
			min-height: 100%;
		}
	}
`;

const StyledUserCard = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 4rem;

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
	}
`;

const StyledGridWrap = styled.div`
	border-top: 1px solid var(--secondary);
	padding-top: 4rem;
	z-index: 10;
	position: relative;
`;

export default function UserPortfolioPage({ user, items, categories }) {
	const { isLoading, session, error } = useSessionContext();
	const [activeCategories, setActiveCategories] = useState([]);

	const [filteredItems, setFilteredItems] = useState([]);
	const [order, setOrder] = useState(filteredItems);

	useEffect(() => {
		if (activeCategories.length === 0) {
			setFilteredItems(items);
		} else {
			setFilteredItems(
				items.filter(
					(item) =>
						item.categories !== null &&
						activeCategories.every((category) =>
							item.categories.includes(category.categoryId)
						)
				)
			);
		}
	}, [activeCategories]);

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

		//TODO: Use supabase.upsert to update several items
		try {
			fetch('/api/reorderItems', {
				method: 'PUT',
				body: JSON.stringify({
					updatedItems,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log(error);
		}

		return updatedItems;
	};

	return (
		<Main>
			<Container>
				{user ? (
					isLoading ? (
						<p>Loading...</p>
					) : (
						<>
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
							<StyledGridWrap>
								{activeCategories && (
									<CategoryCloudFilter
										activeCategories={activeCategories}
										setActiveCategories={
											setActiveCategories
										}
										userCategories={categories}
										all={true}
									/>
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
							</StyledGridWrap>
						</>
					)
				) : (
					<NotLoggedIn />
				)}
			</Container>
			{/* <QrModal
				showQrModal={showQrModal}
				setShowQrModal={setShowQrModal}
			/> */}
		</Main>
	);
}

export async function getServerSideProps(context) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context);
	// Check if we have a session
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

	// Fetch items related to that ID (foreign key relationship)
	// This is ok here, does not need t be an API call:
	//It can be tempting to reach for an API Route when you want to fetch data from the server, then call that API route from getServerSideProps.
	// This is an unnecessary and inefficient approach, as it will cause an extra request to be made due to both getServerSideProps and API Routes running on the server.

	// Store existing category ids on items and flatten the array into a sigle Array
	// Not necessary anymore
	// const categoryIds = items.map((item) => item.categories).flat();

	// Fetch User categories
}

// export async function getStaticPaths() {
// 	// Get all users from supabase
// 	let { data, error } = await supabase.from('profiles').select('id');

// 	// Let Next.js know how many pages (user ids) are there
// 	const paths = data.map((userId) => ({
// 		params: {
// 			id: userId.id,
// 		},
// 	}));

// 	//TODO: If this errors we may need a "loading"
// 	//TODO: If this gets too slow, can switch to getserverSideProps to render on every request
// 	return { paths, fallback: 'blocking' };
// }

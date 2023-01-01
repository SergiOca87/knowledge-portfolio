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

import {
	FaUser,
	FaPlus,
	FaEye,
	FaPencilAlt,
	FaFileDownload,
	FaQrcode,
} from 'react-icons/fa';
import Link from 'next/link';

import ItemGrid from '../../components/items/ItemGrid';
import CategoryCloudFilter from '../../components/categories/CategoryCloudFilter';
import Main from '../../components/layout/Main';
// import PortfolioEdit from '../../components/PortfolioEdit';
// import PortfolioOptionsContext, {
// 	OptionsProvider,
// } from '../../context/PortfolioOptionsContext';
import UserStyleOptions from '../../components/user/UserStyleOptions';
import OrderingModal from '../../components/OrderingModal';
// import { LOGGED_IN_USER } from '../../components/User';
import QrModal from '../../components/QrModal';
import UserContext, { useUserState } from '../../context/userContext';
import NotLoggedIn from '../../components/auth/NotLoggedIn';
import { supabase } from '../../utils/supabaseClient';
import PortfolioControls from '../../components/layout/PortfolioControls';

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
		font-size: 4rem;
	}
`;

const StyledGridWrap = styled.div`
	border-top: 1px solid var(--secondary);
	padding-top: 4rem;
	z-index: 10;
	position: relative;
`;

export default function UserPortfolioPage({ items, categories }) {
	const { user } = useUserState();
	// const [filteredCategories, setFilteredCategories] = useState('');
	const [activeCategories, setActiveCategories] = useState([]);
	// const [items, setItems] = useState();
	//TODO: Add some toast error
	// useEffect(() => {
	// 	const fetchItems = async () => {
	// 		let { data: items, error } = await supabase
	// 			.from('items')
	// 			.select('*')
	// 			.eq('username', user.username);

	// 		if (error) {
	// 			throw error;
	// 		}

	// 		if (items) {
	// 			setItems(items);
	// 		}
	// 	};

	// 	fetchItems().catch(console.error);
	// }, [user]);

	// const handleClose = () => {
	// 	setShow(false);
	// };

	return (
		<Main>
			<Container>
				{user ? (
					<>
						<StyledUserCard>
							{/* {user.options?.userImage !== 'undefined' ? (
								<div
									className="avatar"
									css={`
										background-image: ${user.image};
									`}
								></div>
							) : (
								<div className="avatar">
									<FaUser />
								</div>
							)} */}
							<h1>
								Welcome to your portfolio,{' '}
								{/* <span className="secondary">{user?.name}</span> */}
							</h1>
						</StyledUserCard>

						<StyledGridWrap>
							<PortfolioControls />
							<CategoryCloudFilter
								activeCategories={activeCategories}
								setActiveCategories={setActiveCategories}
								all={true}
							/>
							<ItemGrid
								items={items}
								categories={categories}
								activeCategories={activeCategories}
							/>
						</StyledGridWrap>
					</>
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

// TODO: Maybe the right approach is to use serverSideProps (I tihnk it is most likely), identify the user who is making the request via a supabase function like getUser
//TODO: This is now repeated so it would make sense to put it in a utils folder (yearinreview)
export async function getServerSideProps(context) {
	// Get params from URL
	const { params } = context;

	// Get User ID
	const userId = params.id;

	// Fetch items related to that ID (foreign key relationship)
	// This is ok here, does not need t be an API call:
	//It can be tempting to reach for an API Route when you want to fetch data from the server, then call that API route from getServerSideProps. This is an unnecessary and inefficient approach, as it will cause an extra request to be made due to both getServerSideProps and API Routes running on the server.
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

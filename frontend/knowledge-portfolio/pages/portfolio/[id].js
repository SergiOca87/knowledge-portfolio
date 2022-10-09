import React, { useContext, useEffect, useRef, useState } from 'react';
import { Router, useRouter } from 'next/router';
import styled, { css } from 'styled-components';
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
				border-left: 1px solid var(--secondary);
			}
		}
	}

	button {
		width: 7rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		transition: all 300ms;
		cursor: pointer;
		border-bottom: transparent !important;
		border-right: 1px solid var(--secondary);
		border-top: 4px solid var(--secondary);

		svg {
			transition: all 300ms;
			margin-top: -3px;
		}

		&:hover,
		&:active,
		&:focus {
			border-top: 4px solid var(--secondary);
			background-color: var(--secondary);

			svg {
				stroke: #fff;
				fill: #fff;
			}
		}
	}
`;

export default function UserPortfolioPage({ items }) {
	const { user } = useUserState();
	const router = useRouter();
	const { id } = router.query;
	const [openModal, setOpenModal] = useState(false);
	const [showQrModal, setShowQrModal] = useState(false);
	const [shouldRender, setShouldRender] = useState(true);
	//Tooltip
	const [show, setShow] = useState(false);
	const target = useRef(null);
	// const { user } = useContext(UserContext);
	// const { options } = useContext(PortfolioOptionsContext);

	// const { loading, error, data } = useQuery(LOGGED_IN_USER);

	// // const user = data?.authenticatedItem;

	// const userOptions = user?.options?.options;

	// useEffect(() => {
	// 	console.log('user from context?', user);
	// }, [user]);

	// useEffect(() => {
	// 	if (!firstRender) {
	// 		router.reload(window.location.pathname);
	// 		setFirstRender(true);
	// 	}
	// }, [firstRender]);

	const handleClose = () => {
		setShow(false);
	};

	return (
		<Main>
			<Container>
				{user ? (
					<>
						//TODO: This should be a Component
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
						//TODO: This should be a component
						<UserControls>
							<div>
								<OverlayTrigger
									placement={'top'}
									overlay={
										<Tooltip id={`tooltip-top}`}>
											Add New Portfolio Item
										</Tooltip>
									}
								>
									<Button>
										<Link href={'/add-item'}>
											<FaPlus />
										</Link>
									</Button>
								</OverlayTrigger>
							</div>
							<div>
								<OverlayTrigger
									placement={'top'}
									overlay={
										<Tooltip id={`tooltip-top}`}>
											Toggle Public View
										</Tooltip>
									}
								>
									<Button>
										<Link href={`/public-portfolio/${id}`}>
											<FaEye />
										</Link>
									</Button>
								</OverlayTrigger>
							</div>
							<div>
								{/* <Link href={'/'}>
								<PortfolioEdit
									placement={'end'}
									// setOpenModal={setOpenModal}
									// openModal={openModal}
								/>
							</Link> */}
							</div>
							<div>
								<OverlayTrigger
									placement={'top'}
									overlay={
										<Tooltip id="tooltip-top">
											Download as a PDF
										</Tooltip>
									}
								>
									<Button>
										<Link href={'/'}>
											<FaFileDownload />
										</Link>
									</Button>
								</OverlayTrigger>
							</div>
							<div>
								<OverlayTrigger
									placement={'top'}
									overlay={
										<Tooltip id="tooltip-top">
											Generate QR Code
										</Tooltip>
									}
								>
									<Button
										onClick={() =>
											showQrModal
												? setShowQrModal(false)
												: setShowQrModal(true)
										}
									>
										{/* <Link
										href={`/qr/${id}`}
										query={`${router.pathname}`}
									> */}
										<FaQrcode />
										{/* </Link> */}
									</Button>
								</OverlayTrigger>
							</div>
						</UserControls>
						{/* {loop throug map} */}
						<StyledGridWrap>
							<ItemGrid items={items} />
						</StyledGridWrap>
					</>
				) : (
					<NotLoggedIn />
				)}
			</Container>
			<QrModal
				showQrModal={showQrModal}
				setShowQrModal={setShowQrModal}
			/>
		</Main>
	);
}

// TODO: Make sure this is ok vs useeffect if items are added and page is reloaded
UserPortfolioPage.getInitialProps = async (ctx) => {
	const { data, error } = await supabase.from('items').select();
	return { items: data };
};

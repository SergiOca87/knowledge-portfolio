import React, { useContext, useRef, useState } from 'react';
import { Router, useRouter } from 'next/router';
import gql from 'graphql-tag';
import styled, { css } from 'styled-components';
import {
	Container,
	Row,
	Col,
	Button,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import {
	FaUser,
	FaPlus,
	FaEye,
	FaPencilAlt,
	FaFileDownload,
	FaQrcode,
} from 'react-icons/fa';
import Link from 'next/link';
import { USER_CATEGORIES_QUERY } from '../../components/UserCategories';
import ItemGrid from '../../components/ItemGrid';
import Main from '../../components/Main';
import PortfolioOptionsContext, {
	OptionsProvider,
} from '../../context/PortfolioOptionsContext';
import Search from '../../components/Search';
import { useQuery } from '@apollo/client';
import UserStyleOptions from '../../components/UserStyleOptions';
import CategoryFilter from '../../components/CategoryFilter';
import SearchFilter from '../../components/SearchFilter';
import CategoryCloudFilter from '../../components/CategoryCloudFilter';

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

const USER_QUERY = gql`
	query USER_QUERY($id: ID!) {
		User(where: { id: $id }) {
			name
			options
			items {
				id
				title
				description
				status
				singlePageContent
				categories {
					id
					name
					icon
				}
			}
		}
	}
`;

export default function UserPortfolioPage() {
	//TODO: The user id could be in the options? Somehow, we need to create the public portfolio with a set id, and use that id in the ItemGrid Component, read next
	//TODO: PROBABLY THE URL WITH THE QUERY ID WOULD WORK!
	//TODO: But we need to save details oike user avatar on the user item?
	//TODO: So that any user or visitor can se that info.
	//TODO: The user HAs to have items for this page to work
	const router = useRouter();
	const { id } = router.query;

	const [chosenCategory, setChosenCategory] = useState(null);
	const [text, setText] = useState('');
	const [activeCategories, setActiveCategories] = useState(['All']);

	//Tooltip
	const [show, setShow] = useState(false);
	const target = useRef(null);
	const { user } = useContext(UserContext);
	// const { options } = useContext(PortfolioOptionsContext);

	const { data, loading, error } = useQuery(USER_QUERY, {
		variables: {
			id: user?.id,
		},
	});

	const {
		data: categoriesData,
		error: categoriesError,
		loading: categoriesLoading,
	} = useQuery(USER_CATEGORIES_QUERY, {
		variables: { id },
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<Main>
			<UserStyleOptions user={user}>
				<Container>
					<StyledUserCard>
						{/* //TODO: ADD this functionality when Cloudinary support is
					enabled in Keystone 6 */}
						<div className="flex-wrap">
							{data?.User?.options?.userImage &&
								(data.data?.User?.image ? (
									<div
										className="avatar"
										css={`
											background-image: ${data?.User
												?.image};
										`}
									></div>
								) : (
									<div className="avatar">
										<FaUser />
									</div>
								))}
							{data?.User?.options?.options?.userTitle && (
								<h1>
									{data?.User?.options?.options?.userTitle}
								</h1>
							)}
						</div>
						{data?.User?.options?.options?.userIntroText && (
							<p>{data?.User?.options?.options?.userIntroText}</p>
						)}
					</StyledUserCard>

					{/* Send down state setters, which ar epassed up, set as
					state and passed down to ItemGrid */}
					<SearchFilter filterByText={setText} />
					{/* <CategoryFilter
						categories={categoriesData?.allCategories}
						filterByCategory={setChosenCategory}
					/> */}
					<CategoryCloudFilter
						activeCategories={activeCategories}
						setActiveCategories={setActiveCategories}
					/>
					<StyledGridWrap>
						<ItemGrid
							user={user}
							isPublic={true}
							isPublicPage={true}
							chosenCategory={chosenCategory}
							chosenText={text}
							activeCategories={activeCategories}
						/>
					</StyledGridWrap>
				</Container>
			</UserStyleOptions>
		</Main>
	);
}

import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/client';
import Main from '../components/Main';
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import Link from 'next/link';
import Categories from '../components/Categories';
import UserCard from '../components/UserCard';
import MessageModal from '../components/MessageModal';
import UserContext from '../context/UserContext';

const ALL_USER_QUERY = gql`
	query {
		allUsers(where: { public: true }) {
			id
			name
			email
			publicEmail
			items {
				id
			}
			categories {
				id
				name
				icon
			}
		}
	}
`;

const StyledUserCard = styled.div`
	width: 100%;
	flex: 1;
	background-color: var(--tertiary);
	display: flex;
	flex-direction: column;
	border: 1px solid var(--tertiary);

	.title {
		padding: 2rem;
		text-align: center;
		background-color: var(--tertiary);
		border-bottom: 1px solid var(--secondary);

		h4 {
			margin: 0;
			color: var(--primary);
			color: #fff;
			font-family: 'Montserrat-Medium';
			font-size: 2.2rem;
		}

		p {
			margin-bottom: 0;
		}
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		padding: 2rem;
		margin-top: auto;
		background-color: var(--primary);

		.btn {
			margin-right: 0.5rem;
		}
	}

	.details {
		padding: 2rem;

		.separator {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 2rem 0;
			align-items: flex-start;

			&:not(:last-child) {
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			}

			h5 {
				text-transform: uppercase;
				letter-spacing: 1px;
				margin-bottom: 0.5rem;
				color: var(--secondary);
			}

			p {
				margin: 0;
				padding-left: 2rem;
			}
		}

		.categories {
			display: flex;
			flex-wrap: wrap;
			margin-top: 0.5rem;
			padding-left: 2rem;

			.category {
				font-size: 1.8rem;
				margin-right: 1rem;
			}

			div {
				display: flex;
				align-items: center;
				border: 1px solid var(--secondary);
				font-size: 1.2rem;
				text-transform: uppercase;
				padding: 0.8rem 1.5rem;
				letter-spacing: 1px;
				font-family: 'Montserrat-Medium';
				margin-right: 0.5rem;
			}
		}
	}
`;

export default function publicProfiles() {
	const { data, error, loading } = useQuery(ALL_USER_QUERY);
	const [showMessageModal, setShowMessageModal] = useState(false);
	const [receiverId, setReceiverId] = useState(null);

	const { user } = useContext(UserContext);

	if (loading) {
		return <p>Loading...</p>;
	} else {
		return (
			<Main>
				<Container>
					<h1>Public Portfolios</h1>
					<Row>
						{data &&
							data.allUsers.map((singleUser) => {
								const userId = singleUser.id;
								return (
									<>
										{singleUser.items.length > 0 && (
											<Col md={6}>
												<UserCard user={singleUser} />
												<StyledUserCard>
													{/* <p>Category: {item.category.name}</p> */}
													{singleUser.categories && (
														<Categories
															categories={
																singleUser?.categories
															}
														/>
													)}

													<Link
														href={`/public-portfolio/${singleUser.id}`}
													>
														<Button variant="transparent-secondary">
															View Portfolio
														</Button>
													</Link>
												</StyledUserCard>
												<Button
													onClick={(e) => {
														showMessageModal
															? setShowMessageModal(
																	false
															  )
															: setShowMessageModal(
																	true
															  );
														setReceiverId(
															singleUser.id
														);
													}}
												>
													Send a Message
												</Button>
												{user && (
													<MessageModal
														showMessageModal={
															showMessageModal
														}
														setShowMessageModal={
															setShowMessageModal
														}
														receiverId={receiverId}
														senderId={user?.id}
													/>
												)}
											</Col>
										)}
									</>
								);
							})}
					</Row>
				</Container>
			</Main>
		);
	}
}

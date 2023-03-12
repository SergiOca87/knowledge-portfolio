import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { Tabs, Tab } from 'react-bootstrap';
import Link from 'next/link';
import { LOGGED_IN_USER } from '../../components/User';
import Main from '../../components/Main';
import UserCard from '../../components/UserCard';
import DeleteMessage from '../../components/DeleteMessage';

// const DELETE_MESSAGE_MUTATION = gql`
// 	mutation DELETE_MESSAGE_MUTATION($id: ID!) {
// 		deleteMessage(id: $id) {
// 			id
// 		}
// 	}
// `;

const StyledMessageCard = styled.div`
	background-color: #fff;
	padding: 2rem;
	margin-bottom: 2rem;

	h3 {
		display: flex;
		gap: 1rem;
	}

	h3,
	p {
		color: #000;
	}
`;

export default function UserMessages({ id }) {
	const router = useRouter();
	// const { id } = router.query;
	const { loading, error, data } = useQuery(LOGGED_IN_USER);
	const user = data?.authenticatedItem;
	const [deleteConfirm, setDeleteConfirm] = useState({
		counter: 0,
		message: 'Delete',
	});

	const userId = user?.id;

	// useEffect(() => {
	// 	if (!user) {
	// 		router.push({
	// 			pathname: `/login/`,
	// 		});
	// 	}
	// });

	// const [deleteMessage, { loading, error }] = useMutation(
	// 	DELETE_MESSAGE_MUTATION,
	// 	{
	// 		variables: {
	// 			id: id,
	// 		},

	// 		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	// 	}
	// );

	// const handleDelete = async (e, idx) => {
	// 	e.preventDefault();

	// 	setDeleteConfirm({
	// 		counter: (deleteConfirm.counter += 1),
	// 		message: 'Are You Sure?',
	// 	});

	// 	if (deleteConfirm.counter >= 2) {
	// 		deleteMessage(idx);
	// 	}
	// };

	return user ? (
		<Main>
			<Container>
				<Row>
					<p>Mailbox</p>

					<Tabs
						defaultActiveKey="profile"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab eventKey="received" title="Received">
							{user?.received.length > 0 ? (
								<>
									{user?.received.map((message) => {
										return (
											<StyledMessageCard>
												<h3>
													Sender:
													<Link
														href={`/public-portfolio/${message?.sender?.id}`}
													>
														<div>
															{
																message?.sender
																	?.name
															}
														</div>
													</Link>
												</h3>
												<p>{message.text}</p>

												<div className="message-controls">
													<DeleteMessage
														id={message.id}
													/>
												</div>
											</StyledMessageCard>
										);
									})}
								</>
							) : (
								<h2>No Messages</h2>
							)}
						</Tab>
						<Tab eventKey="sent" title="Sent">
							{console.log('sent', user)}
							{user?.sent.length > 0 ? (
								<>
									{user?.sent.map((message) => {
										return (
											<StyledMessageCard>
												<h3>
													Sent to
													<Link
														href={`/public-portfolio/${message?.receiver?.id}`}
													>
														<div>
															{
																message
																	?.receiver
																	?.name
															}
														</div>
													</Link>
												</h3>
												<p>{message.text}</p>

												<div className="message-controls">
													<DeleteMessage
														id={message.id}
													/>
												</div>
											</StyledMessageCard>
										);
									})}
								</>
							) : (
								<h2>No Messages</h2>
							)}
						</Tab>
					</Tabs>
				</Row>
			</Container>
		</Main>
	) : (
		<Main>
			<Container>
				<h2>
					You have to log in to see this content,
					<br />
					You can log in or register <Link href="/login">here</Link>
				</h2>
			</Container>
		</Main>
	);
}

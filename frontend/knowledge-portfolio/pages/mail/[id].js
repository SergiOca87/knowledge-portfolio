import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import Main from '../../components/Main';
import UserCard from '../../components/UserCard';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY, useUser } from '../../components/User';

const DELETE_MESSAGE_MUTATION = gql`
	mutation DELETE_MESSAGE_MUTATION($id: ID!) {
		deleteMessage(id: $id) {
			id
		}
	}
`;

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

export default function UserMessages() {
	// const router = useRouter();
	// const { id } = router.query;
	const { user } = useContext(UserContext);
	const [deleteConfirm, setDeleteConfirm] = useState({
		counter: 0,
		message: 'Delete',
	});

	const userId = user?.id;

	const [deleteMessage, { loading, error }] = useMutation(
		DELETE_MESSAGE_MUTATION,
		{
			variables: {
				id,
			},

			refetchQueries: [{ query: CURRENT_USER_QUERY }],
		}
	);

	const handleDelete = async (e, idx) => {
		e.preventDefault();

		setDeleteConfirm({
			counter: (deleteConfirm.counter += 1),
			message: 'Are You Sure?',
		});

		if (deleteConfirm.counter >= 2) {
			deleteMessage(idx);
		}
	};

	return (
		<Main>
			<Container>
				<Row>
					<p>Mailbox</p>
					{user?.received.length > 0 ? (
						<>
							<h2>Messages:</h2>

							{user?.received.map((message) => {
								return (
									<StyledMessageCard>
										<h3>
											Sender:
											<Link
												href={`/public-portfolio/${message?.sender?.id}`}
											>
												<div>
													{message?.sender?.name}
												</div>
											</Link>
										</h3>
										<p>{message.text}</p>

										<div className="message-controls">
											<Button
												variant="secondary"
												onClick={handleDelete(
													e,
													message?.id
												)}
												disabled={loading}
											>
												{deleteConfirm.counter === 0
													? children
													: deleteConfirm.message}
											</Button>
										</div>
									</StyledMessageCard>
								);
							})}
						</>
					) : (
						<h2>No Messages</h2>
					)}
				</Row>
			</Container>
		</Main>
	);
}

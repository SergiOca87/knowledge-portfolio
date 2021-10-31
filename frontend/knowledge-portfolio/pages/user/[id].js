import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import UserCard from '../../components/UserCard';

const StyledMain = styled.main`
	min-height: 100vh;
	padding: 6rem 0;
	background-size: 60%;
	background-position: right;
	background-repeat: no-repeat;
	background-color: var(--primary);
	background-image: var(--primary-bg-image);
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	overflow: hidden;
	color: #fff;
`;

const StyledUserCard = styled.div`
	text-align: center;

	.avatar {
		width: 20rem;
		height: 20rem;
		margin: 0 auto;
		border-radius: 50%;
		border: 3px solid var(--secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
		font-size: 8rem;
	}
`;

const UserControls = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.btn {
		margin: 0 1rem;
	}
`;

const UPDATE_USER_MUTATION = gql`
	mutation UPDATE_USER_MUTATION(
		$id: ID!
	) {
		updateUser(
			id: $id
			//TODO: Add data here, publicEmail, social amedia, etc.
			# data: { title: $title, status: $status, description: $description }
		) {
			id
		}
	}
`;

export default function UserPage() {
	const router = useRouter();
	// const { id } = router.query;
	const { user } = useContext(UserContext);

	return (
		<StyledMain>
			<Container>
				<Row>
					<p>Edit User Settings</p>
					<div className="avatar">
						<FaUser />
					</div>
					{user && <UserCard user={user} />}
					{/* <UserCard user={user} /> */}
					{/* <h1>Hello, {user?.name}</h1> */}
					//TODO Form here to edit social media and public e-mail
					settings, updateUserQuery? Or user options?
					<UserControls></UserControls>
				</Row>
			</Container>
		</StyledMain>
	);
}

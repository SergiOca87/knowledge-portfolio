import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';

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

export default function SingleItemPage() {
	const router = useRouter();
	const { id } = router.query;

	const { user } = useContext(UserContext);

	return (
		<StyledMain>
			<Container>
				<Row>
					<StyledUserCard>
						<p>Draft/Page to delete account if necessary</p>
						<div className="avatar">
							<FaUser />
						</div>
						<h1>Hello, {user?.name}</h1>
					</StyledUserCard>
					<UserControls></UserControls>
				</Row>
			</Container>
		</StyledMain>
	);
}

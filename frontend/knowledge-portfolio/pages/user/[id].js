import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	FloatingLabel,
} from 'react-bootstrap';

import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import UserCard from '../../components/user/UserCard';
import { useUserState } from '../../context/userContext';
import NotLoggedIn from '../../components/auth/NotLoggedIn';

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

export default function UserPage() {
	const router = useRouter();
	// const { id } = router.query;
	const user = useUser();

	return (
		<StyledMain>
			<Container>
				{user ? (
					<>
						<Row className="mb-5">
							<h2>Edit your public user card</h2>
						</Row>
						<Row>
							<Col lg="6" lg={{ order: 2 }}>
								{user && <UserCard user={user} />}
							</Col>
							<Col lg="6" lg={{ order: 1 }}>
								<Form>
									<Form.Group
										as={Row}
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label column sm="2">
											Public Email?
										</Form.Label>
										<Col sm="10">
											<Form.Check
												type={'checkbox'}
												id={`default-checkbox`}
												label={`Users can see your e-mail and send you e-mails`}
											/>
										</Col>
									</Form.Group>
									<Form.Group
										as={Row}
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label column sm="2">
											Linkedin
										</Form.Label>
										<Col sm="10">
											<Form.Control
												type="text"
												placeholder="Linkedin"
											/>
										</Col>
									</Form.Group>
									<Form.Group
										as={Row}
										className="mb-3"
										controlId="exampleForm.ControlInput2"
									>
										<Form.Label column sm="2">
											Twitter
										</Form.Label>
										<Col sm="10">
											<Form.Control
												type="text"
												placeholder="Twitter"
											/>
										</Col>
									</Form.Group>
									<Form.Group
										as={Row}
										className="mb-3"
										controlId="exampleForm.ControlInput3"
									>
										<Form.Label column sm="2">
											Youtube
										</Form.Label>
										<Col sm="10">
											<Form.Control
												type="text"
												placeholder="Youtube"
											/>
										</Col>
									</Form.Group>
									<Form.Group
										as={Row}
										className="mb-3"
										controlId="exampleForm.ControlInput4"
									>
										<Form.Label column sm="2">
											Instagram
										</Form.Label>
										<Col sm="10">
											<Form.Control
												type="text"
												placeholder="Instagram"
											/>
										</Col>
									</Form.Group>
								</Form>
							</Col>
						</Row>
					</>
				) : (
					<NotLoggedIn />
				)}
			</Container>
		</StyledMain>
	);
}

//TODO: Maybe we should either use the user context, or get it from getServerSideProps() (apuntes)

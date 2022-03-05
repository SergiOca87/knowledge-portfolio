import React from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import Link from 'next/link';
import { Col, Container, Row, Card } from 'react-bootstrap';
import Main from '../components/Main';

const StyledFormCard = styled.div`
	padding: 3rem 2rem;
	border: 1px solid var(--tertiary);
	height: 100%;
	background-color: #102540;
`;

export default function login() {
	return (
		<Main>
			<Container>
				<Row>
					<Col lg={6}>
						<SignIn />
					</Col>
					<Col lg={6}>
						<SignUp />
					</Col>
				</Row>
			</Container>
		</Main>
	);
}

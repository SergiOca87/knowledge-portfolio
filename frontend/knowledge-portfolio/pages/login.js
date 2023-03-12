import React from 'react';
// import SignIn from '../components/SignIn';
// import SignUp from '../components/SignUp';
import styled from 'styled-components';
// import RequestReset from '../components/RequestReset';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Col, Container, Row, Card } from 'react-bootstrap';
import Main from '../components/layout/Main';
import SignInUp from '../components/auth/SignInUp';
import { supabase } from '../utils/supabaseClient';
import { useUserState } from '../context/userContext';
import { useUser } from '@supabase/auth-helpers-react';

const StyledFormCard = styled.div`
	padding: 3rem 2rem;
	border: 1px solid var(--tertiary);
	height: 100%;
	background-color: #102540;
`;

export default function login() {
	const user = useUser();

	return (
		<Main>
			<Container>
				<motion.div
					initial={{ opacity: 0, y: '50px' }}
					whileInView={{ opacity: 1, y: '0' }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					{user ? (
						<p>
							You are already logged in, proceed to your{' '}
							<Link href={`/portfolio/${user.id}`}>
								Portfolio
							</Link>{' '}
						</p>
					) : (
						<SignInUp />
					)}
				</motion.div>
				{/* <Row> */}
				{/* <Col lg={6}> */}
				{/* <SignIn /> */}
				{/* </Col> */}
				{/* <Col lg={6}> */}
				{/* <SignUp /> */}
				{/* </Col> */}
				{/* </Row> */}
			</Container>
		</Main>
	);
}

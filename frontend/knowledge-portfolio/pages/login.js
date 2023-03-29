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
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const StyledFormCard = styled.div`
	padding: 3rem 2rem;
	border: 1px solid var(--tertiary);
	height: 100%;
	background-color: #102540;
`;

export default function login({ user }) {
	return (
		<Main>
			<Container>
				<motion.div
					initial={{ opacity: 0, y: '50px' }}
					whileInView={{ opacity: 1, y: '0' }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					//TODO: ServerSideProps or check if we are logged in,
					//TODO: redirect to profile
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

export async function getServerSideProps(context) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		return {
			redirect: {
				destination: '/profile',
				permanent: false,
			},
		};
	}

	// Empty props, we don't need anything here
	return {
		props: {},
	};
}

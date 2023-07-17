import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import Image from 'next/image';
import Main from '../components/layout/Main';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

const StyledUserCard = styled(Card)`
	max-width: 50rem;
	margin: 6rem auto;
	padding: 4rem;

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		h2 {
			color: #fff;
			font-family: 'Montserrat-Regular', serif;
			margin: 0;
		}
	}

	.card-buttons {
		margin-top: 6rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

// TODO: This has to be tested

const resetPassword = () => {
	try {
		fetch('/api/resetPassword', {
			method: 'GET',
			headers: { 'Content-Type': 'application.json' },
		});
	} catch (err) {
		toast.error(err);
	}
};

function profile({ user }) {
	return (
		<Main>
			<Container>
				<StyledUserCard>
					<div className="header">
						{user.user_metadata.avatar_url && (
							<Image
								src={user.user_metadata.avatar_url}
								alt="Picture of the author"
								width={50}
								height={50}
							/>
						)}

						<h2>
							{user.user_metadata.full_name
								? user.user_metadata.full_name
								: user.email}
						</h2>
					</div>

					<Card.Body>
						<div className="card-buttons">
							<Link href="/portfolio">
								<Button variant="primary" type="button">
									Reset Password
								</Button>
							</Link>

							<Link href="/portfolio">
								<Button variant="primary" type="button">
									Sign Out
								</Button>
							</Link>
						</div>
					</Card.Body>
				</StyledUserCard>
			</Container>
		</Main>
	);
}

export default profile;

export async function getServerSideProps(context) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			user: session.user,
		},
	};
}

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import SignOut from '../auth/SignOut';
import styled, { css } from 'styled-components';
import { Container } from 'react-bootstrap';

// import { LOGGED_IN_USER } from './User';
import {
	FaEnvelope,
	FaMailBulk,
	FaRegEnvelope,
	FaRegEnvelopeOpen,
	FaUser,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 2rem;
	width: 100%;
	gap: 5rem;
	z-index: 10;
	position: relative;
	background-color: var(--black);
	border-bottom: 1px solid var(--secondary);

	h1 {
		margin: 0;
		font-size: 5.5rem;
		font-family: 'Montserrat-ExtraBold';
	}

	a {
		display: flex;
		align-items: center;
		text-transform: uppercase;
		font-family: 'Montserrat-Bold';
		color: var(--primary);
		text-decoration: none;
		font-size: 1.5rem;

		&:hover,
		&.active {
			color: var(--secondary);
			text-decoration: none;
		}
	}
`;

const StyledMail = styled.div`
	position: relative;

	span {
		position: absolute;
		bottom: -10px;
		right: -10px;
		background-color: #000;
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 2px;
		border-radius: 50%;
		width: 17px;
		height: 17px;
		font-size: 10px;
	}
`;

export default function Nav() {
	const user = useUser();
	const router = useRouter();
	const userId = user ? user.id : null;

	const { isLoading, session, error } = useSessionContext();

	return (
		<div>
			<StyledNav>
				<div>
					{/* <h1 className="primary">
						K<span className="secondary">P</span>
					</h1> */}
					<h2>Logo</h2>
				</div>

				<div
					className="d-flex align-items-center justify-between"
					css={css`
						gap: 3rem;
					`}
				>
					{session ? (
						<>
							<Link href="/portfolio">
								<a
									className={
										router.pathname.includes('/portfolio/')
											? 'active'
											: ''
									}
								>
									Portfolio
								</a>
							</Link>
							<Link href="/year-in-review">
								<a
									className={
										router.pathname.includes(
											'/year-in-review/'
										)
											? 'active'
											: ''
									}
								>
									Year In Review
								</a>
							</Link>
							<Link href="user">
								<FaUser />
							</Link>

							<SignOut />
						</>
					) : (
						<Link href="/login">Sign In</Link>
					)}
				</div>
			</StyledNav>
		</div>
	);
}
